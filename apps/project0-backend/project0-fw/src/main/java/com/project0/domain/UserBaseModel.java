package com.project0.domain;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public abstract class UserBaseModel extends NamedModel {

  @Column(name="owner_uid")
  private String ownerUid;
}
