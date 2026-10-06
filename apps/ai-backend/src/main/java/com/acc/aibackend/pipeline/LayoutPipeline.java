package com.acc.aibackend.pipeline;

import com.acc.aibackend.domain.LayoutSpec;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class LayoutPipeline {

    private final List<LayoutPipelineStage> stages;

    public LayoutPipeline(List<LayoutPipelineStage> stages) {
        this.stages = stages.stream()
                .sorted(Comparator.comparingInt(LayoutPipelineStage::getOrder))
                .toList();
    }

    public LayoutSpec execute(LayoutSpec initialSpec) {
        LayoutSpec currentSpec = initialSpec;
        for (LayoutPipelineStage stage : stages) {
            currentSpec = stage.process(currentSpec);
        }
        return currentSpec;
    }

    public List<LayoutPipelineStage> getStages() {
        return stages;
    }
}
