package com.acc.aibackend.inference;

import com.acc.aibackend.inference.embedded.JlamaEmbeddedModelProvider;
import com.acc.aibackend.inference.embedded.NativeModelRegistry;
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

    @Bean("embeddedNativeLayoutStrategy")
    public LayoutGenerationService embeddedNativeLayoutStrategy(
            NativeModelRegistry nativeModelRegistry,
            @Qualifier("qwenLayoutStrategy") LayoutGenerationService qwenFallback) {
        return new EmbeddedFirstInferenceStrategy(nativeModelRegistry, qwenFallback);
    }

    @Bean("layoutStrategyRegistry")
    public Map<String, LayoutGenerationService> layoutStrategyRegistry(
            @Qualifier("qwenLayoutStrategy") LayoutGenerationService qwen,
            @Qualifier("llamaLayoutStrategy") LayoutGenerationService llama,
            @Qualifier("embeddedNativeLayoutStrategy") LayoutGenerationService embeddedNative) {

        return Map.of(
            "qwen", qwen,
            "llama", llama,
            "embedded", embeddedNative,
            "native", embeddedNative
        );
    }

    @Bean
    public NativeModelRegistry nativeModelRegistry(
            @Qualifier("qwenModel") ChatLanguageModel qwenModel,
            @Qualifier("llamaModel") ChatLanguageModel llamaModel) {

        NativeModelRegistry registry = new NativeModelRegistry();
        registry.register(new JlamaEmbeddedModelProvider("qwen-2.5-coder-1.5b", qwenModel));
        registry.register(new JlamaEmbeddedModelProvider("llama-3.2-1b-instruct", llamaModel));
        return registry;
    }
}
