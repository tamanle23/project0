package com.project0.worker.quartz;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.project0.core.exception.ErrorCodes;
import com.project0.worker.controller.request.ScheduleRequestBody;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.quartz.Trigger.TriggerState;
import org.quartz.TriggerKey;
import org.quartz.impl.matchers.GroupMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Service;

import com.project0.core.exception.BusinessException;
import com.project0.core.io.ContextHeader;
import com.project0.core.io.RequestWrapper;

@Service
public class JobServiceImpl implements JobService {

  Logger logger = LoggerFactory.getLogger(JobServiceImpl.class);

  @Autowired
  @Lazy
  SchedulerFactoryBean schedulerFactoryBean;

  private void schedule(String jobName, Class<? extends QuartzJobBean> jobClass, LocalDateTime date) {
    String triggerKey = jobName;
    JobDetail jobDetail = JobUtil.createJob(jobName, null, jobClass, null);

    Trigger trigger = JobUtil.createTrigger(triggerKey, null, date, SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW);
    try {
      Scheduler scheduler = schedulerFactoryBean.getScheduler();
      scheduler.scheduleJob(jobDetail, trigger);
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
  }

  private void schedule(String jobName, Class<? extends QuartzJobBean> jobClass, LocalDateTime date, String cronExpression) {
    JobDetail jobDetail = JobUtil.createJob(jobName, null, jobClass, null);
    try {
      Trigger trigger = JobUtil.createTrigger(jobName, null, date, SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW, cronExpression);
      Scheduler scheduler = schedulerFactoryBean.getScheduler();
      scheduler.scheduleJob(jobDetail, trigger);
    } catch (Exception e) {
      throw BusinessException.create(e);
    }
  }

  @Override
  public void update(String jobName, LocalDateTime date) {
    try {
      Trigger newTrigger = JobUtil.createTrigger(jobName, null, date, SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW);
      schedulerFactoryBean.getScheduler().rescheduleJob(TriggerKey.triggerKey(jobName), newTrigger);
    } catch (Exception e) {
      throw BusinessException.create(e);
    }
  }

  @Override
  public void update(String jobName, LocalDateTime date, String cronExpression) {
    try {
      Trigger newTrigger = JobUtil.createTrigger(jobName, null, date, SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW, cronExpression);
      schedulerFactoryBean.getScheduler().rescheduleJob(TriggerKey.triggerKey(jobName), newTrigger);
    } catch (Exception e) {
      throw BusinessException.create(e);
    }
  }

  @Override
  public void unschedule(String jobName) {
    String jobKey = jobName;
    TriggerKey tkey = new TriggerKey(jobKey);
    try {
      schedulerFactoryBean.getScheduler().unscheduleJob(tkey);
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
  }

  @Override
  public void delete(String jobName) {
    JobKey jkey = new JobKey(jobName, null);
    if (!this.isPresent(jobName)) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_JOBNAME_NOT_EXISTS);
    }
    if(this.isRunning(jobName)) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_DELETE_JOB_RUNNING);
    }
    try {
      schedulerFactoryBean.getScheduler().deleteJob(jkey);
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
  }

  @Override
  public void pause(String jobName) {
    String jobKey = jobName;
    JobKey jkey = new JobKey(jobKey, null);
    if (!this.isPresent(jobName)) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_JOBNAME_NOT_EXISTS);
    }
    if(!this.isRunning(jobName)) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_PAUSE_JOB_NOT_RUNNING);
    }
    try {
      schedulerFactoryBean.getScheduler().pauseJob(jkey);
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
  }

  @Override
  public void resume(String jobName) {
    String jobKey = jobName;
    JobKey jKey = new JobKey(jobKey, null);
    if (!this.isPresent(jobName)) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_JOBNAME_NOT_EXISTS);
    }
    String jobState = this.getJobState(jobName);
    if (!jobState.equals("PAUSED")) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_RESUME_JOB_NOT_PAUSED);
    }
    try {
      schedulerFactoryBean.getScheduler().resumeJob(jKey);
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
  }

  @Override
  public void start(String jobName) {
    String jobKey = jobName;
    JobKey jKey = new JobKey(jobKey, null);

    if (!this.isPresent(jobName)) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_JOBNAME_NOT_EXISTS);
    }
    if (this.isRunning(jobName)) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_START_JOB_RUNNING);
    }
    try {
      schedulerFactoryBean.getScheduler().triggerJob(jKey);
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
  }

  @Override
  public boolean isRunning(String jobName) {
    String jobKey = jobName;
    try {
      List<JobExecutionContext> currentJobs = schedulerFactoryBean.getScheduler().getCurrentlyExecutingJobs();
      if (currentJobs != null) {
        for (JobExecutionContext jobCtx : currentJobs) {
          String jobNameDB = jobCtx.getJobDetail().getKey().getName();
          if (jobKey.equalsIgnoreCase(jobNameDB)) {
            return true;
          }
        }
      }
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
    return false;
  }

  @Override
  public List<Map<String, Object>> getAllJobs() {
    List<Map<String, Object>> list = new ArrayList<>();
    try {
      Scheduler scheduler = schedulerFactoryBean.getScheduler();
      for (String groupName : scheduler.getJobGroupNames()) {
        for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.jobGroupEquals(groupName))) {
          String jobName = jobKey.getName();
          String jobGroup = jobKey.getGroup();
          // get job's trigger
          List<Trigger> triggers = (List<Trigger>) scheduler.getTriggersOfJob(jobKey);
          Date scheduleTime = triggers.get(0).getStartTime();
          Date nextFireTime = triggers.get(0).getNextFireTime();
          Date lastFiredTime = triggers.get(0).getPreviousFireTime();
          Map<String, Object> map = new HashMap<>();
          map.put("name", jobName);
          map.put("groupName", jobGroup);
          map.put("scheduleTime", scheduleTime);
          map.put("lastFiredTime", lastFiredTime);
          map.put("nextFireTime", nextFireTime);

          if (isRunning(jobName)) {
            map.put("status", "RUNNING");
          } else {
            String jobState = getJobState(jobName);
            map.put("status", jobState);
          }
          list.add(map);
        }
      }
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
    return list;
  }

  @Override
  public boolean isPresent(String jobName) {
    try {
      JobKey jobKey = new JobKey(jobName, null);
      Scheduler scheduler = schedulerFactoryBean.getScheduler();
      if (scheduler.checkExists(jobKey)) {
        return true;
      }
    } catch (SchedulerException e) {
    }
    return false;
  }

  public String getJobState(String jobName) {
    JobKey jobKey = new JobKey(jobName, null);
    Scheduler scheduler = schedulerFactoryBean.getScheduler();
    try {
      List<? extends Trigger> triggers = scheduler.getTriggersOfJob(jobKey);
      if (CollectionUtils.isNotEmpty(triggers)) {
        for (Trigger trigger : triggers) {
          TriggerState triggerState = scheduler.getTriggerState(trigger.getKey());
          if (TriggerState.PAUSED.equals(triggerState)) {
            return "PAUSED";
          } else if (TriggerState.BLOCKED.equals(triggerState)) {
            return "BLOCKED";
          } else if (TriggerState.COMPLETE.equals(triggerState)) {
            return "COMPLETE";
          } else if (TriggerState.ERROR.equals(triggerState)) {
            return "ERROR";
          } else if (TriggerState.NONE.equals(triggerState)) {
            return "NONE";
          } else if (TriggerState.NORMAL.equals(triggerState)) {
            return "SCHEDULED";
          }
        }
      }
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
    return "INVALID";
  }

  /**
   * Stop a job
   */
  @Override
  public void stop(String jobName) {
    String jobKey = jobName;
    Scheduler scheduler = schedulerFactoryBean.getScheduler();
    JobKey jkey = new JobKey(jobKey, null);

    if (!this.isPresent(jobName)) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_JOBNAME_NOT_EXISTS);
    }
    if (!this.isRunning(jobName)) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_STOP_JOB_NOT_RUNNING);
    }
    try {
      scheduler.interrupt(jkey);
    } catch (SchedulerException e) {
      throw BusinessException.create(e);
    }
  }

  @Override
  public List<Map<String, Object>> schedule(RequestWrapper<ContextHeader, ScheduleRequestBody> request) {
    if (this.isPresent(request.getBody().getJobName())) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_JOBNAME_EXISTS);
    }

    if (StringUtils.isBlank(request.getBody().getCronExpression())) {
      this.schedule(request.getBody().getJobName(), SimpleJob.class, request.getBody().getJobScheduleTime());
    } else {
      this.schedule(request.getBody().getJobName(), CronJob.class, request.getBody().getJobScheduleTime(), request.getBody().getCronExpression());
    }
    return this.getAllJobs();
  }

  @Override
  public List<Map<String, Object>> update(RequestWrapper<ContextHeader, ScheduleRequestBody> request) {
    if (!this.isPresent(request.getBody().getJobName())) {
      throw BusinessException.create().add(ErrorCodes.ERROR_SCHEDULER_JOBNAME_NOT_EXISTS);
    }
    if (StringUtils.isBlank(request.getBody().getCronExpression())) {
      this.update(request.getBody().getJobName(), request.getBody().getJobScheduleTime());
    } else {
      this.update(request.getBody().getJobName(), request.getBody().getJobScheduleTime(), request.getBody().getCronExpression());
    }
    return this.getAllJobs();
  }
}
