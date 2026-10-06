package com.acc.aibackend.inference;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.service.AiServices;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class LayoutStrategyConfig {

    @Bean("qwenLayoutStrategy")
    public LayoutGenerationService qwenLayoutStrategy(@Qualifier("qwenModel") ChatLanguageModel model) {
        return AiServices.builder(LayoutGenerationService.class)
                .chatLanguageModel(model)
                .build();
    }

    @Bean("llamaLayoutStrategy")
    public LayoutGenerationService llamaLayoutStrategy(@Qualifier("llamaModel") ChatLanguageModel model) {
        return AiServices.builder(LayoutGenerationService.class)
                .chatLanguageModel(model)
                .build();
    }

    @Bean("layoutStrategyRegistry")
    public Map<String, LayoutGenerationService> layoutStrategyRegistry(
            @Qualifier("qwenLayoutStrategy") LayoutGenerationService qwen,
            @Qualifier("llamaLayoutStrategy") LayoutGenerationService llama) {

        return Map.of(
            "qwen", qwen,
            "llama", llama
        );
    }
}
