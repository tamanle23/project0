package com.project0.user.model;

import jakarta.persistence.Convert;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;

import com.project0.domain.NamedModel;
import com.project0.user.model.connect.ConnectJson;
import com.project0.user.model.converter.ConnectJsonConverter;
import com.project0.user.model.enums.ConnectType;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class AccountConnect extends NamedModel {

  private static final long serialVersionUID = -4267764236780329490L;

  User user;

  @Enumerated(EnumType.STRING)
  ConnectType type;

  @Lob
  @Convert(converter= ConnectJsonConverter.class)
  ConnectJson connectJson;

}
