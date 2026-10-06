package com.acc.aibackend.pipeline;

import com.acc.aibackend.domain.LayoutSpec;

public interface LayoutPipelineStage {

    LayoutSpec process(LayoutSpec spec);

    default int getOrder() {
        return 0;
    }
}
