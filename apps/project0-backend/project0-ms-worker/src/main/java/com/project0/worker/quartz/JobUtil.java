package com.project0.worker.quartz;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;

import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.quartz.impl.triggers.CronTriggerImpl;
import org.quartz.impl.triggers.SimpleTriggerImpl;
import org.quartz.utils.Key;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.project0.core.helper.ObjectHelper;

public class JobUtil {

  private JobUtil() {
  }

  protected static<T extends QuartzJobBean> JobDetail createJob(String jobName, String jobGroup, Class<T> jobClass, Map<String, Object> jobData) {
    JobDataMap jobDataMap = new JobDataMap();
    if(jobData != null && !jobData.isEmpty()) {
      jobDataMap.putAll(jobData);
    }

    return JobBuilder.newJob(jobClass)
                     .requestRecovery(false)
                     .storeDurably(false)
                     .withIdentity(jobName, ObjectHelper.INSTANCE.nvl(jobGroup, Scheduler.DEFAULT_GROUP))
                     .setJobData(jobDataMap)
                     .build();
  }

  protected static Trigger createTrigger(String jobName, String groupName, LocalDateTime startTime, int misFireInstruction, String cronExpression) throws ParseException {
    CronTriggerImpl trigger = new CronTriggerImpl();
    trigger.setName(ObjectHelper.INSTANCE.nvl(jobName, Key.createUniqueName(null)));
    trigger.setGroup(ObjectHelper.INSTANCE.nvl(groupName,  Scheduler.DEFAULT_GROUP));
    trigger.setStartTime(Date.from(startTime.toInstant(ZoneOffset.UTC)));
    trigger.setCronExpression(cronExpression);
    trigger.setTimeZone(TimeZone.getDefault());
    trigger.setMisfireInstruction(misFireInstruction);
    return trigger;
  }

  protected static Trigger createTrigger(String jobName, String groupName, LocalDateTime startTime, int misFireInstruction) {
    SimpleTriggerImpl trigger = new SimpleTriggerImpl();
    trigger.setName(ObjectHelper.INSTANCE.nvl(jobName, Key.createUniqueName(null)));
    trigger.setGroup(ObjectHelper.INSTANCE.nvl(groupName,  Scheduler.DEFAULT_GROUP));
    trigger.setStartTime(Date.from(startTime.toInstant(ZoneOffset.UTC)));
    trigger.setRepeatCount(0);
    trigger.setMisfireInstruction(misFireInstruction);
    return trigger;
  }
}
