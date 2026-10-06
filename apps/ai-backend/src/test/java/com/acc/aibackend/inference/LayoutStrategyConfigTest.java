package com.acc.aibackend.inference;

import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.output.Response;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class LayoutStrategyConfigTest {

    @Test
    void testLayoutStrategyRegistryMapping() {
        LayoutStrategyConfig config = new LayoutStrategyConfig();

        ChatLanguageModel dummyModel = new ChatLanguageModel() {
            @Override
            public Response<AiMessage> generate(List<ChatMessage> messages) {
                return Response.from(AiMessage.from("dummy"));
            }
        };

        LayoutGenerationService qwenService = config.qwenLayoutStrategy(dummyModel);
        LayoutGenerationService llamaService = config.llamaLayoutStrategy(dummyModel);

        assertNotNull(qwenService);
        assertNotNull(llamaService);

        Map<String, LayoutGenerationService> registry = config.layoutStrategyRegistry(qwenService, llamaService);

        assertEquals(2, registry.size());
        assertSame(qwenService, registry.get("qwen"));
        assertSame(llamaService, registry.get("llama"));
    }
}
