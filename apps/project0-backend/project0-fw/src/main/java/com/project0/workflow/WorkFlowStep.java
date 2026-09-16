package com.project0.workflow;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


import com.project0.domain.NamedModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@Table(name="project0_workflowstep")
@Entity
public class WorkFlowStep extends NamedModel {

  private static final long serialVersionUID = 4988525232032204020L;

  @ManyToOne
  @JoinColumn(name="workflowId", nullable=false)
  private WorkFlow workflow;

  private Action action;
  private RecordState oldStatus;
  private RecordState newStatus;
}
