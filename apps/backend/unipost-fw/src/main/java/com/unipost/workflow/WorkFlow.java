package com.unipost.workflow;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.unipost.domain.NamedModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@Table(name="unipost_workflow")
@Entity
public class WorkFlow extends NamedModel {

  private static final long serialVersionUID = 3566776335261596775L;

  @OneToMany(mappedBy="workflow", fetch=FetchType.LAZY)
  private List<WorkFlowStep> steps;

  private String targetUid;

}
