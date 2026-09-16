package com.project0.worker.repository.mybatis;

import com.project0.repository.mybatis.SearchRepository;
import com.project0.worker.controller.request.TaskSearchRequest;
import com.project0.worker.model.Task;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TaskSearchRepository extends SearchRepository<Task, TaskSearchRequest> {
}
