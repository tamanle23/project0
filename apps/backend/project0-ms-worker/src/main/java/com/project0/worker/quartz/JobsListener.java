package com.project0.worker.quartz;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class JobsListener implements JobListener {

  Logger logger = LoggerFactory.getLogger(JobsListener.class);

  @Override
  public String getName() {
    return "globalJob";
  }

  @Override
  public void jobToBeExecuted(JobExecutionContext context) {
    logger.info("Job to be executed: {}", context.getJobDetail().getKey());
  }

  @Override
  public void jobExecutionVetoed(JobExecutionContext context) {
    logger.info("Job to be vetoed: {}", context.getJobDetail().getKey());
  }

  @Override
  public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {
    logger.info("Job was executed: {}", context.getJobDetail().getKey());
  }

}
