package com.unipost.fs.model.converter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unipost.domain.JsonConverter;
import com.unipost.fs.model.FileAttributes;
import org.springframework.stereotype.Component;

@Component
public class AttributeJsonConverter extends JsonConverter<FileAttributes> {
  public AttributeJsonConverter(ObjectMapper objectMapper) {
    super(objectMapper);
  }
}
