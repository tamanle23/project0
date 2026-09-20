package com.project0.worker.quartz;

import java.util.List;
import java.util.Map;

import org.quartz.InterruptableJob;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;
import org.quartz.UnableToInterruptJobException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class SimpleJob extends QuartzJobBean implements InterruptableJob {

  private volatile boolean toStopFlag = true;

  @Autowired
  JobService jobService;

  @Override
  protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
    JobKey key = jobExecutionContext.getJobDetail().getKey();
    List<Map<String, Object>> list = jobService.getAllJobs();
    JobDataMap dataMap = jobExecutionContext.getMergedJobDataMap();
    String myValue = dataMap.getString("myKey");
    // *********** For retrieving stored object, It will try to deserialize the
    // bytes Object. ***********/
    /*
     * SchedulerContext schedulerContext = null; try { schedulerContext =
     * jobExecutionContext.getScheduler().getContext(); } catch (SchedulerException
     * e1) { e1.printStackTrace(); } YourClass yourClassObject = (YourClass)
     * schedulerContext.get("storedObjectKey");
     */

    while (toStopFlag) {
      try {
        System.out.println("Test Job Running... Thread Name :" + Thread.currentThread().getName());
        Thread.sleep(2000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }

  @Override
  public void interrupt() throws UnableToInterruptJobException {
    toStopFlag = false;
  }

}
