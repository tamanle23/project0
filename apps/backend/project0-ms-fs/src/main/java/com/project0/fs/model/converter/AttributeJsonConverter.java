package com.project0.fs.model.converter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project0.domain.JsonConverter;
import com.project0.fs.model.FileAttributes;
import org.springframework.stereotype.Component;

@Component
public class AttributeJsonConverter extends JsonConverter<FileAttributes> {
  public AttributeJsonConverter(ObjectMapper objectMapper) {
    super(objectMapper);
  }
}
