package com.acc.aibackend.inference.embedded;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.jlama.JlamaChatModel;

public class JlamaEmbeddedModelProvider implements EmbeddedModelProvider {

    private final String modelName;
    private final ChatLanguageModel chatLanguageModel;

    public JlamaEmbeddedModelProvider(String modelName) {
        this.modelName = modelName;
        this.chatLanguageModel = JlamaChatModel.builder()
                .modelName(modelName)
                .temperature(0.1f)
                .maxTokens(2048)
                .build();
    }

    public JlamaEmbeddedModelProvider(String modelName, ChatLanguageModel chatLanguageModel) {
        this.modelName = modelName;
        this.chatLanguageModel = chatLanguageModel;
    }

    @Override
    public String getModelName() {
        return modelName;
    }

    @Override
    public boolean isAvailable() {
        return chatLanguageModel != null;
    }

    @Override
    public ChatLanguageModel getModel() {
        return chatLanguageModel;
    }

    @Override
    public int getPriority() {
        return 1;
    }
}
