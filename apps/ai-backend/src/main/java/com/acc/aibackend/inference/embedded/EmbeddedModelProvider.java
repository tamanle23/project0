package com.acc.aibackend.inference.embedded;

import dev.langchain4j.model.chat.ChatLanguageModel;

public interface EmbeddedModelProvider {

    String getModelName();

    boolean isAvailable();

    ChatLanguageModel getModel();

    default int getPriority() {
        return 10;
    }
}
