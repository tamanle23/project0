package com.project0.worker.controller.response;

import com.project0.worker.model.enums.TaskFrequency;
import com.project0.worker.model.enums.TaskStatus;
import com.project0.worker.model.enums.TaskType;
import com.project0.worker.model.enums.TriggerType;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDateTime;

@Getter
@Setter
public class TaskVm {
  private Long id;
  private String uid;
  private String code;
  private String description;
  private TaskFrequency frequency;
  private String cronExpression;
  private Long repeatInterval;
  private TriggerType triggerType;
  private LocalDateTime runAfter;
  private TaskType type;
  private String reference;
  private TaskStatus status;
}
