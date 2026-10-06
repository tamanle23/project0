package com.acc.aibackend.inference.embedded;

import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.output.Response;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class NativeModelRegistryTest {

    @Test
    void testRegisterAndRetrieveProvider() {
        ChatLanguageModel dummyModel = new ChatLanguageModel() {
            @Override
            public Response<AiMessage> generate(List<ChatMessage> messages) {
                return Response.from(AiMessage.from("test"));
            }
        };
        JlamaEmbeddedModelProvider provider = new JlamaEmbeddedModelProvider("qwen-native", dummyModel);

        NativeModelRegistry registry = new NativeModelRegistry();
        registry.register(provider);

        Optional<EmbeddedModelProvider> retrieved = registry.getProvider("QWEN-NATIVE");
        assertTrue(retrieved.isPresent());
        assertEquals("qwen-native", retrieved.get().getModelName());
        assertTrue(retrieved.get().isAvailable());
    }

    @Test
    void testGetPrimaryProviderByPriority() {
        ChatLanguageModel dummyModel = new ChatLanguageModel() {
            @Override
            public Response<AiMessage> generate(List<ChatMessage> messages) {
                return Response.from(AiMessage.from("test"));
            }
        };

        EmbeddedModelProvider lowPriorityProvider = new EmbeddedModelProvider() {
            @Override
            public String getModelName() { return "low-priority"; }
            @Override
            public boolean isAvailable() { return true; }
            @Override
            public ChatLanguageModel getModel() { return dummyModel; }
            @Override
            public int getPriority() { return 5; }
        };

        EmbeddedModelProvider highPriorityProvider = new EmbeddedModelProvider() {
            @Override
            public String getModelName() { return "high-priority"; }
            @Override
            public boolean isAvailable() { return true; }
            @Override
            public ChatLanguageModel getModel() { return dummyModel; }
            @Override
            public int getPriority() { return 1; }
        };

        NativeModelRegistry registry = new NativeModelRegistry(List.of(lowPriorityProvider, highPriorityProvider));

        Optional<EmbeddedModelProvider> primary = registry.getPrimaryProvider();
        assertTrue(primary.isPresent());
        assertEquals("high-priority", primary.get().getModelName());
    }
}
