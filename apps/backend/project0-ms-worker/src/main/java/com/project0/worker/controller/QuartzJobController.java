package com.project0.worker.controller;

import java.util.List;
import java.util.Map;

import com.project0.core.io.ContextHeader;
import com.project0.worker.controller.request.ScheduleRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project0.core.io.ResponseWrapper;
import com.project0.fw.CommonController;
import com.project0.worker.quartz.JobService;

@RestController
@RequestMapping("/api/scheduler/")
public class QuartzJobController extends CommonController {

  @Autowired
  JobService jobService;

  @GetMapping("schedule")
  public ResponseWrapper<ContextHeader, List<Map<String, Object>>> schedule(ScheduleRequestBody requestBody) {
    return success(jobService.schedule(extractRequest(requestBody)));
  }

  @GetMapping("unschedule")
  public ResponseWrapper<ContextHeader, Void> unschedule(@RequestParam("jobName") String jobName) {
    jobService.unschedule(jobName);
    return success();
  }

  @GetMapping("delete")
  public ResponseWrapper<ContextHeader, Void> delete(@RequestParam("jobName") String jobName) {
    jobService.delete(jobName);
    return success();
  }

  @GetMapping("pause")
  public ResponseWrapper<ContextHeader, Void> pause(@RequestParam("jobName") String jobName) {
    jobService.pause(jobName);
    return success();
  }

  @GetMapping("resume")
  public ResponseWrapper<ContextHeader, Void> resume(@RequestParam("jobName") String jobName) {
    jobService.resume(jobName);
    return success();
  }

  @GetMapping("update")
  public ResponseWrapper<ContextHeader, List<Map<String, Object>>> updateJob(@RequestBody ScheduleRequestBody requestBody) {
    return ResponseWrapper.success(jobService.update(extractRequest(requestBody)));
  }

  @GetMapping("jobs")
  public ResponseWrapper<ContextHeader, List<Map<String, Object>>> getAllJobs() {
    return ResponseWrapper.success(jobService.getAllJobs());
  }

  @GetMapping("checkJobName")
  public ResponseWrapper<ContextHeader, Boolean> checkJobName(@RequestParam("jobName") String jobName) {
    jobService.isPresent(jobName);
    return success();
  }

  @GetMapping("isJobRunning")
  public ResponseWrapper<ContextHeader, Boolean> isJobRunning(@RequestParam("jobName") String jobName) {
    boolean status = jobService.isRunning(jobName);
    return ResponseWrapper.success(status);
  }

  @GetMapping("jobState")
  public ResponseWrapper<ContextHeader, String> getJobState(@RequestParam("jobName") String jobName) {
    String jobState = jobService.getJobState(jobName);
    return ResponseWrapper.success(jobState);
  }

  @GetMapping("stop")
  public ResponseWrapper<ContextHeader, Void> stopJob(@RequestParam("jobName") String jobName) {
    jobService.stop(jobName);
    return success();
  }

  @GetMapping("start")
  public ResponseWrapper<ContextHeader, Void> startJobNow(@RequestParam("jobName") String jobName) {
    jobService.start(jobName);
    return success();
  }
}
