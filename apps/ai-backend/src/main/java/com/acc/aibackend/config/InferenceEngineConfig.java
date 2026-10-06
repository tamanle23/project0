package com.acc.aibackend.config;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.jlama.JlamaChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InferenceEngineConfig {

    @Value("${ai.model.qwen.name:qwen-2.5-coder-1.5b}")
    private String qwenModelName;

    @Value("${ai.model.llama.name:llama-3.2-1b-instruct}")
    private String llamaModelName;

    @Bean(name = "qwenModel")
    public ChatLanguageModel qwenModel() {
        return JlamaChatModel.builder()
                .modelName(qwenModelName)
                .temperature(0.1f)
                .maxTokens(2048)
                .build();
    }

    @Bean(name = "llamaModel")
    public ChatLanguageModel llamaModel() {
        return JlamaChatModel.builder()
                .modelName(llamaModelName)
                .temperature(0.2f)
                .maxTokens(2048)
                .build();
    }
}
