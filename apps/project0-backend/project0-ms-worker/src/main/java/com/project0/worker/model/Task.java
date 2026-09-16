package com.project0.worker.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

import com.project0.domain.UserBaseModel;
import com.project0.worker.model.enums.TaskStatus;
import com.project0.worker.model.enums.TaskFrequency;
import com.project0.worker.model.enums.TaskType;
import com.project0.worker.model.enums.TriggerType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "project0_task")
@Entity
public class Task extends UserBaseModel {

  @Enumerated(EnumType.STRING)
  private TaskFrequency frequency;
  private String cronExpression;
  private Long repeatInterval;
  @Enumerated(EnumType.STRING)
  private TriggerType triggerType;
  private LocalDateTime runAfter;
  @Enumerated(EnumType.STRING)
  private TaskType type;
  private String reference;
  @Enumerated(EnumType.STRING)
  private TaskStatus status;
}
