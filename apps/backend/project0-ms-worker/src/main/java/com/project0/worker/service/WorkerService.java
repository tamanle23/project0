package com.project0.worker.service;

import com.project0.core.io.ContextHeader;
import com.project0.core.io.RequestWrapper;
import com.project0.worker.controller.request.WorkerInput;
import com.project0.worker.controller.response.WorkerOutput;

import java.util.Set;

public interface WorkerService {
  public WorkerOutput run(RequestWrapper<ContextHeader, WorkerInput> input);
  public Set<String> getAvailableJobs();
}
