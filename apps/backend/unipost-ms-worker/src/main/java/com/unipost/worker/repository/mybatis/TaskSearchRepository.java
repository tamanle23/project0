package com.unipost.worker.repository.mybatis;

import com.unipost.repository.mybatis.SearchRepository;
import com.unipost.worker.controller.request.TaskSearchRequest;
import com.unipost.worker.model.Task;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TaskSearchRepository extends SearchRepository<Task, TaskSearchRequest> {
}
