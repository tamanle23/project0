package com.unipost.worker.service;

import com.unipost.core.io.Page;
import com.unipost.service.CrudService;
import com.unipost.worker.controller.request.TaskSearchRequest;
import com.unipost.worker.model.Task;

public interface TaskService extends CrudService<Task> {
  Page<Task> findBy(TaskSearchRequest searchRequest);
}
