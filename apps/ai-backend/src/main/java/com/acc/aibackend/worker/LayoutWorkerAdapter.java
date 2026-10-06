package com.acc.aibackend.worker;

import com.acc.aibackend.domain.LayoutSpec;
import com.acc.aibackend.inference.LayoutGenerationService;
import com.acc.aibackend.pipeline.LayoutPipeline;
import com.netflix.conductor.client.worker.Worker;
import com.netflix.conductor.common.metadata.tasks.Task;
import com.netflix.conductor.common.metadata.tasks.TaskResult;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class LayoutWorkerAdapter implements Worker {

    private final Map<String, LayoutGenerationService> strategyRegistry;
    private final LayoutPipeline layoutPipeline;
    private static final String DEFAULT_STRATEGY = "qwen";

    public LayoutWorkerAdapter(
            @Qualifier("layoutStrategyRegistry") Map<String, LayoutGenerationService> strategyRegistry,
            LayoutPipeline layoutPipeline) {
        this.strategyRegistry = strategyRegistry;
        this.layoutPipeline = layoutPipeline;
    }

    @Override
    public String getTaskDefName() {
        return "generate_ai_layout";
    }

    @Override
    public TaskResult execute(Task task) {
        if (task.getStatus() == null) {
            task.setStatus(Task.Status.IN_PROGRESS);
        }
        TaskResult result = new TaskResult(task);
        try {
            // 1. Extract Inputs
            String theme = task.getInputData() != null ? (String) task.getInputData().get("theme") : null;

            // 2. Resolve Strategy Dynamically (fallback to Qwen if unspecified)
            String modelPreference = (task.getInputData() != null && task.getInputData().containsKey("model_preference"))
                    ? (String) task.getInputData().get("model_preference")
                    : DEFAULT_STRATEGY;

            LayoutGenerationService aiService = strategyRegistry.getOrDefault(modelPreference, strategyRegistry.get(DEFAULT_STRATEGY));

            if (aiService == null) {
                throw new IllegalStateException("No strategy found for model: " + modelPreference);
            }

            // 3. Execute Strategy
            LayoutSpec rawLayout = aiService.generateLayout(theme);

            // 4. Process layout through Pipeline
            LayoutSpec processedLayout = layoutPipeline != null ? layoutPipeline.execute(rawLayout) : rawLayout;

            // 5. Return Output
            result.getOutputData().put("layoutSpec", processedLayout);
            result.getOutputData().put("executed_model", modelPreference);
            result.setStatus(TaskResult.Status.COMPLETED);

        } catch (Exception e) {
            result.setStatus(TaskResult.Status.FAILED_WITH_TERMINAL_ERROR);
            result.setReasonForIncompletion("Strategy Execution Failed: " + e.getMessage());
        }
        return result;
    }
}
