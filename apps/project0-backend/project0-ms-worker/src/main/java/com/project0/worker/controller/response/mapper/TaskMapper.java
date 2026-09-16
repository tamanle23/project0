package com.project0.worker.controller.response.mapper;

import com.project0.core.io.Page;
import com.project0.worker.controller.response.TaskVm;
import com.project0.worker.model.Task;
import com.project0.workflow.RecordState;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(imports =  {RecordState.class})
public abstract class TaskMapper {
  public abstract Page<TaskVm> pageMap(Page<Task> article);

  public abstract TaskVm modelToVm(Task task);
  public abstract Task vmToModel(TaskVm task);

  public abstract List<Task> vmToModel(List<TaskVm> article);
  public abstract List<TaskVm> modelToVm(List<Task> article);
}
