package com.project0.worker.controller;

import com.project0.core.constant.ResourceConstants;
import com.project0.core.io.ContextHeader;
import com.project0.core.io.Page;
import com.project0.core.io.ResponseWrapper;
import com.project0.fw.QueryController;
import com.project0.fw.controller.resolver.JsonParam;
import com.project0.worker.controller.request.TaskSearchRequest;
import com.project0.worker.controller.response.TaskVm;
import com.project0.worker.controller.response.mapper.TaskMapper;
import com.project0.worker.model.Task;
import com.project0.worker.service.TaskService;
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
