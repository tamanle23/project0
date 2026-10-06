package com.acc.aibackend.worker;

import com.acc.aibackend.domain.LayoutSpec;
import com.acc.aibackend.inference.LayoutGenerationService;
import com.netflix.conductor.common.metadata.tasks.Task;
import com.netflix.conductor.common.metadata.tasks.TaskResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class LayoutWorkerAdapterTest {

    private LayoutGenerationService qwenService;
    private LayoutGenerationService llamaService;
    private LayoutWorkerAdapter workerAdapter;

    @BeforeEach
    void setUp() {
        qwenService = theme -> new LayoutSpec("qwen-123", theme, "Qwen Title", List.of(), Map.of());
        llamaService = theme -> new LayoutSpec("llama-456", theme, "Llama Title", List.of(), Map.of());

        Map<String, LayoutGenerationService> registry = Map.of(
                "qwen", qwenService,
                "llama", llamaService
        );

        workerAdapter = new LayoutWorkerAdapter(registry);
    }

    private Task createTestTask(String theme, String modelPreference) {
        Task task = new Task();
        task.setStatus(Task.Status.IN_PROGRESS);
        Map<String, Object> inputData = new HashMap<>();
        if (theme != null) {
            inputData.put("theme", theme);
        }
        if (modelPreference != null) {
            inputData.put("model_preference", modelPreference);
        }
        task.setInputData(inputData);
        return task;
    }

    @Test
    void testGetTaskDefName() {
        assertEquals("generate_ai_layout", workerAdapter.getTaskDefName());
    }

    @Test
    void testExecuteWithDefaultStrategy() {
        Task task = createTestTask("dark", null);

        TaskResult result = workerAdapter.execute(task);

        assertEquals(TaskResult.Status.COMPLETED, result.getStatus());
        assertEquals("qwen", result.getOutputData().get("executed_model"));

        LayoutSpec spec = (LayoutSpec) result.getOutputData().get("layoutSpec");
        assertNotNull(spec);
        assertEquals("qwen-123", spec.getLayoutId());
        assertEquals("dark", spec.getTheme());
    }

    @Test
    void testExecuteWithLlamaStrategy() {
        Task task = createTestTask("light", "llama");

        TaskResult result = workerAdapter.execute(task);

        assertEquals(TaskResult.Status.COMPLETED, result.getStatus());
        assertEquals("llama", result.getOutputData().get("executed_model"));

        LayoutSpec spec = (LayoutSpec) result.getOutputData().get("layoutSpec");
        assertNotNull(spec);
        assertEquals("llama-456", spec.getLayoutId());
        assertEquals("light", spec.getTheme());
    }

    @Test
    void testExecuteWithUnknownStrategyFallbackToDefault() {
        Task task = createTestTask("glassmorphism", "unknown_model");

        TaskResult result = workerAdapter.execute(task);

        assertEquals(TaskResult.Status.COMPLETED, result.getStatus());
        assertEquals("unknown_model", result.getOutputData().get("executed_model"));

        LayoutSpec spec = (LayoutSpec) result.getOutputData().get("layoutSpec");
        assertNotNull(spec);
        assertEquals("qwen-123", spec.getLayoutId());
    }

    @Test
    void testExecuteFailureHandling() {
        LayoutGenerationService failingService = theme -> {
            throw new RuntimeException("Inference timed out");
        };

        Map<String, LayoutGenerationService> failingRegistry = Map.of(
                "qwen", failingService
        );

        LayoutWorkerAdapter failingWorker = new LayoutWorkerAdapter(failingRegistry);
        Task task = createTestTask("cyberpunk", null);

        TaskResult result = failingWorker.execute(task);

        assertEquals(TaskResult.Status.FAILED_WITH_TERMINAL_ERROR, result.getStatus());
        assertTrue(result.getReasonForIncompletion().contains("Inference timed out"));
    }
}
