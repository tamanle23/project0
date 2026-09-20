package com.project0.user.model.converter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project0.domain.JsonConverter;
import com.project0.user.model.connect.ConnectJson;


public class ConnectJsonConverter extends JsonConverter<ConnectJson> {
  public ConnectJsonConverter(ObjectMapper objectMapper) {
    super(objectMapper);
  }
}
