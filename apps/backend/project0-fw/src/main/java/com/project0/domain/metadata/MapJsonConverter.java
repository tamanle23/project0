package com.project0.domain.metadata;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project0.domain.JsonConverter;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.persistence.Converter;

import java.util.Map;

@Converter(autoApply = false)
public class MapJsonConverter extends JsonConverter<Map<String, Object>> {

    public MapJsonConverter(@Autowired ObjectMapper objectMapper) {
        super(objectMapper);
    }
}
