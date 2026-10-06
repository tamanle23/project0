package com.unipost.worker.service.impl;

import com.unipost.core.io.Page;
import com.unipost.service.BaseModelService;
import com.unipost.worker.controller.request.TaskSearchRequest;
import com.unipost.worker.model.Task;
import com.unipost.worker.repository.jpa.TaskRepository;
import com.unipost.worker.repository.mybatis.TaskSearchRepository;
import com.unipost.worker.service.TaskService;
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
