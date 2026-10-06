package com.unipost.worker.controller;

import com.unipost.core.constant.ResourceConstants;
import com.unipost.fw.CommandController;
import com.unipost.worker.controller.response.TaskVm;
import com.unipost.worker.model.Task;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/task")
public class TaskCommandController extends CommandController<Task, TaskVm> {
  @Override
  public String getResourceName() {
    return ResourceConstants.TASK;
  }
}
