package com.project0.worker.service;

import com.project0.core.io.Page;
import com.project0.service.CrudService;
import com.project0.worker.controller.request.TaskSearchRequest;
import com.project0.worker.model.Task;

public interface TaskService extends CrudService<Task> {
  Page<Task> findBy(TaskSearchRequest searchRequest);
}
