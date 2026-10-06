package com.acc.aibackend.inference.embedded;

import com.acc.aibackend.domain.LayoutSpec;
import com.acc.aibackend.inference.EmbeddedFirstInferenceStrategy;
import com.acc.aibackend.inference.LayoutGenerationService;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class EmbeddedFirstInferenceStrategyTest {

    @Test
    void testFallbackWhenNoEmbeddedProviderAvailable() {
        NativeModelRegistry emptyRegistry = new NativeModelRegistry();
        LayoutGenerationService fallbackService = theme -> new LayoutSpec("fallback-1", theme, "Fallback Title", List.of(), Map.of());

        EmbeddedFirstInferenceStrategy strategy = new EmbeddedFirstInferenceStrategy(emptyRegistry, fallbackService);

        LayoutSpec result = strategy.generateLayout("cyberpunk");

        assertNotNull(result);
        assertEquals("fallback-1", result.getLayoutId());
        assertEquals("cyberpunk", result.getTheme());
    }

    @Test
    void testExceptionWhenNoProviderAndNoFallback() {
        NativeModelRegistry emptyRegistry = new NativeModelRegistry();
        EmbeddedFirstInferenceStrategy strategy = new EmbeddedFirstInferenceStrategy(emptyRegistry, null);

        assertThrows(IllegalStateException.class, () -> strategy.generateLayout("dark"));
    }
}
