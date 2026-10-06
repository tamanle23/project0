package com.acc.aibackend.pipeline;

import com.acc.aibackend.domain.LayoutSpec;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class LayoutPipelineTest {

    @Test
    void testPipelineExecutionAndOrdering() {
        LayoutValidationStage validationStage = new LayoutValidationStage();
        MetadataEnrichmentStage enrichmentStage = new MetadataEnrichmentStage();

        LayoutPipeline pipeline = new LayoutPipeline(List.of(enrichmentStage, validationStage));

        assertEquals(2, pipeline.getStages().size());
        assertEquals(1, pipeline.getStages().get(0).getOrder());
        assertEquals(2, pipeline.getStages().get(1).getOrder());

        LayoutSpec rawSpec = new LayoutSpec(null, "dark", "Pipeline Test", null, null);
        LayoutSpec processedSpec = pipeline.execute(rawSpec);

        assertNotNull(processedSpec.getLayoutId());
        assertTrue(processedSpec.getLayoutId().startsWith("layout-"));
        assertNotNull(processedSpec.getComponents());
        assertNotNull(processedSpec.getMetadata());
        assertEquals("1.0", processedSpec.getMetadata().get("version"));
        assertNotNull(processedSpec.getMetadata().get("processedAt"));
    }
}
