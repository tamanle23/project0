package com.unipost.worker.quartz;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.unipost.core.io.ContextHeader;
import com.unipost.core.io.RequestWrapper;
import com.unipost.worker.controller.request.ScheduleRequestBody;

public interface JobService {

  void unschedule(String jobName);

  void update(String jobName, LocalDateTime date);

  void update(String jobName, LocalDateTime date, String cronExpression);

  void delete(String jobName);

  void pause(String jobName);

  void resume(String jobName);

  void start(String jobName);

  void stop(String jobName);

  boolean isRunning(String jobName);

  boolean isPresent(String jobName);

  String getJobState(String jobName);

  List<Map<String, Object>> schedule(RequestWrapper<ContextHeader, ScheduleRequestBody> request);

  List<Map<String, Object>> update(RequestWrapper<ContextHeader, ScheduleRequestBody> request);

  List<Map<String, Object>> getAllJobs();
}
