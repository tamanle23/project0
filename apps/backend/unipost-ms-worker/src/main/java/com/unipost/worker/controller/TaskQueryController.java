package com.unipost.worker.controller;

import com.unipost.core.constant.ResourceConstants;
import com.unipost.core.io.ContextHeader;
import com.unipost.core.io.Page;
import com.unipost.core.io.ResponseWrapper;
import com.unipost.fw.QueryController;
import com.unipost.fw.controller.resolver.JsonParam;
import com.unipost.worker.controller.request.TaskSearchRequest;
import com.unipost.worker.controller.response.TaskVm;
import com.unipost.worker.controller.response.mapper.TaskMapper;
import com.unipost.worker.model.Task;
import com.unipost.worker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/task")
public class TaskQueryController extends QueryController<Task, TaskVm, TaskSearchRequest> {

  @Override
  public String getResourceName() {
    return ResourceConstants.TASK;
  }

  @Autowired
  TaskService taskService;

  @Autowired
  TaskMapper mapper;


  @Override
  public ResponseWrapper<ContextHeader, Page<TaskVm>> getSearch(@JsonParam("request") TaskSearchRequest searchRequest){
    return success(
      mapper.pageMap(this.taskService.findBy(searchRequest))
    );
  }

  @Override
  public ResponseWrapper<ContextHeader, Page<TaskVm>> postSearch(@RequestBody TaskSearchRequest searchRequest){
    return success(
      mapper.pageMap(this.taskService.findBy(searchRequest))
    );
  }
}
