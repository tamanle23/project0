package com.project0.worker.controller.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class WorkerOutput {
  Long jobExecutionId;
  Long jobInstanceId;
}
