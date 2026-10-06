package com.unipost.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
@Entity
@Table(name = "unipost_project")
public class Project extends NamedModel {
  private static final long serialVersionUID = -6559175446099189753L;


}
