package com.project0.worker.controller.request;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleRequestBody {
  String jobName;
  LocalDateTime jobScheduleTime;
  String cronExpression;
}
