package com.project0.worker.controller.request;

import lombok.*;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class WorkerInput {
  String jobName;
  Long jobExecutionId;
  JobAction action;
  boolean force = false;
  Map<String, String> parameters;
}
