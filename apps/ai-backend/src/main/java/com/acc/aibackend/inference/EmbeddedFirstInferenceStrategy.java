package com.acc.aibackend.inference;

import com.acc.aibackend.domain.LayoutSpec;
import com.acc.aibackend.inference.embedded.EmbeddedModelProvider;
import com.acc.aibackend.inference.embedded.NativeModelRegistry;
import dev.langchain4j.service.AiServices;

import java.util.Optional;

public class EmbeddedFirstInferenceStrategy implements LayoutGenerationService {

    private final NativeModelRegistry nativeModelRegistry;
    private final LayoutGenerationService fallbackService;

    public EmbeddedFirstInferenceStrategy(NativeModelRegistry nativeModelRegistry, LayoutGenerationService fallbackService) {
        this.nativeModelRegistry = nativeModelRegistry;
        this.fallbackService = fallbackService;
    }

    @Override
    public LayoutSpec generateLayout(String theme) {
        Optional<EmbeddedModelProvider> embeddedProvider = nativeModelRegistry.getPrimaryProvider();
        if (embeddedProvider.isPresent() && embeddedProvider.get().isAvailable()) {
            LayoutGenerationService nativeService = AiServices.builder(LayoutGenerationService.class)
                    .chatLanguageModel(embeddedProvider.get().getModel())
                    .build();
            return nativeService.generateLayout(theme);
        }

        if (fallbackService != null) {
            return fallbackService.generateLayout(theme);
        }

        throw new IllegalStateException("No active native embedded model provider or fallback strategy available");
    }
}
