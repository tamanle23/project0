package com.unipost.domain;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

@Data
@EqualsAndHashCode(callSuper=true)
@jakarta.persistence.Entity
@Table(name = "unipost_entity")
public class Entity extends NamedModel {
  private String name;

  @JsonIgnore
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "unipost_entityField",
    joinColumns = {
      @JoinColumn(name = "entity_uid",
        referencedColumnName = "uid",
        nullable = false)},
    inverseJoinColumns = {
      @JoinColumn(name = "field_uid",
        referencedColumnName = "uid",
        nullable = false)
    })
  private Set<Field> fields;
}
