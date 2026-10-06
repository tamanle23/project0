package com.acc.aibackend.pipeline;

import com.acc.aibackend.domain.LayoutSpec;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Component
@Order(2)
public class MetadataEnrichmentStage implements LayoutPipelineStage {

    @Override
    public LayoutSpec process(LayoutSpec spec) {
        Map<String, Object> metadata = spec.getMetadata();
        if (metadata == null) {
            metadata = new HashMap<>();
        } else {
            metadata = new HashMap<>(metadata);
        }
        metadata.put("processedAt", Instant.now().toString());
        metadata.put("version", "1.0");
        spec.setMetadata(metadata);
        return spec;
    }

    @Override
    public int getOrder() {
        return 2;
    }
}
