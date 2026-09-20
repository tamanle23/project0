package com.project0.worker.service.impl;

import com.project0.core.io.Page;
import com.project0.service.BaseModelService;
import com.project0.worker.controller.request.TaskSearchRequest;
import com.project0.worker.model.Task;
import com.project0.worker.repository.jpa.TaskRepository;
import com.project0.worker.repository.mybatis.TaskSearchRepository;
import com.project0.worker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl extends BaseModelService<Task, TaskRepository> implements TaskService {

  @Autowired
  TaskSearchRepository queryRepository;

  @Override
  public Page<Task> findBy(TaskSearchRequest searchRequest) {
    return super.pageBuilder.build(searchRequest.getPageRequest()
      , () -> queryRepository.countBy(searchRequest)
      , () -> queryRepository.findBy(searchRequest));
  }
}
