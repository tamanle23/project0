package com.unipost.worker.service;

import com.unipost.core.io.ContextHeader;
import com.unipost.core.io.RequestWrapper;
import com.unipost.worker.controller.request.WorkerInput;
import com.unipost.worker.controller.response.WorkerOutput;

import java.util.Set;

public interface WorkerService {
  public WorkerOutput run(RequestWrapper<ContextHeader, WorkerInput> input);
  public Set<String> getAvailableJobs();
}
