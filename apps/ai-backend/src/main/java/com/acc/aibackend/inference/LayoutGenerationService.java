package com.acc.aibackend.inference;

import com.acc.aibackend.domain.LayoutSpec;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;

public interface LayoutGenerationService {

    @UserMessage("Generate a UI layout specification for the theme: {{theme}}")
    LayoutSpec generateLayout(@V("theme") String theme);
}
