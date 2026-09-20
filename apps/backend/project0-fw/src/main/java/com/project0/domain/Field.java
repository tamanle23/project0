package com.project0.domain;

import com.project0.domain.NamedModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.persistence.Table;

@Data
@EqualsAndHashCode(callSuper=true)
@jakarta.persistence.Entity
@Table(name = "project0_field")
public class Field extends NamedModel {
  private String name;
  private String type;
  private Integer length;
  private Integer decimal;
  private Integer origin;
}
