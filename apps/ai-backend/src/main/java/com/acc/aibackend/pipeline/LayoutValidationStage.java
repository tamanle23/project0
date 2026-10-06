package com.acc.aibackend.pipeline;

import com.acc.aibackend.domain.LayoutSpec;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.UUID;

@Component
@Order(1)
public class LayoutValidationStage implements LayoutPipelineStage {

    @Override
    public LayoutSpec process(LayoutSpec spec) {
        if (spec == null) {
            throw new IllegalArgumentException("LayoutSpec cannot be null");
        }
        if (spec.getLayoutId() == null || spec.getLayoutId().isBlank()) {
            spec.setLayoutId("layout-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (spec.getComponents() == null) {
            spec.setComponents(new ArrayList<>());
        }
        return spec;
    }

    @Override
    public int getOrder() {
        return 1;
    }
}
