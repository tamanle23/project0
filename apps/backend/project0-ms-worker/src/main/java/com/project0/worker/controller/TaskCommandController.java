package com.project0.worker.controller;

import com.project0.core.constant.ResourceConstants;
import com.project0.fw.CommandController;
import com.project0.worker.controller.response.TaskVm;
import com.project0.worker.model.Task;
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
