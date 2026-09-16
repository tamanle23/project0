package com.project0.worker.quartz;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.quartz.InterruptableJob;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;
import org.quartz.UnableToInterruptJobException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class CronJob extends QuartzJobBean implements InterruptableJob {

  Logger logger = Logger.getLogger(this.getClass());

  private volatile boolean toStopFlag = true;

  @Autowired
  JobService jobService;

  @Override
  protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
    JobKey key = jobExecutionContext.getJobDetail().getKey();
    List<Map<String, Object>> list = jobService.getAllJobs();
    JobDataMap dataMap = jobExecutionContext.getMergedJobDataMap();
    String myValue = dataMap.getString("myKey");
    try {
      Thread.sleep(60000);
    } catch (InterruptedException e) {
      logger.warn("ERROR occured: ", e);
      Thread.currentThread().interrupt();
    }
  }

  @Override
  public void interrupt() throws UnableToInterruptJobException {
    toStopFlag = false;
  }

}
