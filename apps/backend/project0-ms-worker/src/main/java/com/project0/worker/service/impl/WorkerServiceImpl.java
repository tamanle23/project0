package com.project0.worker.service.impl;

import com.project0.core.exception.BusinessException;
import com.project0.core.exception.ErrorCodes;
import com.project0.core.io.ContextHeader;
import com.project0.core.io.RequestWrapper;
import com.project0.worker.controller.request.WorkerInput;
import com.project0.worker.controller.response.WorkerOutput;
import com.project0.worker.service.WorkerService;
import lombok.SneakyThrows;
import org.apache.commons.collections.MapUtils;
import org.springframework.batch.core.job.Job;
import org.springframework.batch.core.job.JobExecution;
import org.springframework.batch.core.job.parameters.JobParameters;
import org.springframework.batch.core.job.parameters.JobParametersBuilder;
import org.springframework.batch.core.configuration.JobRegistry;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.JobOperator;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class WorkerServiceImpl implements WorkerService {

  @Autowired
  ApplicationContext applicationContext;

  @Autowired
  JobLauncher jobLauncher;

  @Autowired
  JobOperator jobOperator;

  @Autowired
  JobRepository jobRepository;

  @Autowired
  JobRegistry jobRegistry;

  @Override
  @SneakyThrows
  public WorkerOutput run(RequestWrapper<ContextHeader, WorkerInput> input) {
//    Job job = (Job) applicationContext.getBean(input.getBody().getJobName());
    Job job = (Job) applicationContext.getBean("articleScrapingJob");
    if(job == null) {
      BusinessException.create()
        .add(ErrorCodes.ERROR_JOB_DOESNT_EXIST)
        .throwEx();
    }
    JobParametersBuilder jobParametersBuilder = new JobParametersBuilder();
    if(MapUtils.isNotEmpty(input.getBody().getParameters())) {
      input.getBody().getParameters().forEach((i1,i2) -> jobParametersBuilder.addString(i1, i2));
    }
    JobParameters parameters = jobParametersBuilder.toJobParameters();
    JobExecution lastJobExecution = jobRepository.getLastJobExecution(job.getName(), parameters);
    switch(input.getBody().getAction()){
      case STOP:
        if(lastJobExecution != null && Long.valueOf(lastJobExecution.getId()).equals(input.getBody().getJobExecutionId())) {
          jobOperator.stop(lastJobExecution.getId());
        } else {
          BusinessException.create()
            .add(ErrorCodes.ERROR_JOB_CANNOT_BE_STOPPED)
            .throwEx();
        }
        break;

      case RESTART:
        if(lastJobExecution != null && Long.valueOf(lastJobExecution.getId()).equals(input.getBody().getJobExecutionId())) {
          jobOperator.restart(lastJobExecution.getId());
        } else {
          BusinessException.create()
            .add(ErrorCodes.ERROR_JOB_CANNOT_BE_RESTARTED)
            .throwEx();
        }
        break;
      case START:
      default:
        if(lastJobExecution != null && input.getBody().isForce()) {
          jobParametersBuilder.addString("random", UUID.randomUUID().toString());
          lastJobExecution = jobLauncher.run(job, jobParametersBuilder.toJobParameters());
        } else if(lastJobExecution == null) {
          lastJobExecution = jobLauncher.run(job, parameters);
        } else {
          BusinessException.create()
            .add(ErrorCodes.ERROR_JOB_CANNOT_BE_STARTED)
            .throwEx();
        }
        break;
    }
    return WorkerOutput.builder()
                        .jobExecutionId(lastJobExecution.getId())
                        .jobInstanceId(lastJobExecution.getJobInstanceId())
                        .build();

  }

  @Override
  public Set<String> getAvailableJobs() {
    return new HashSet<>(this.jobRegistry.getJobNames());
  }
}
