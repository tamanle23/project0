package com.project0.worker.scaping;

import com.project0.core.logging.LoggerFactory;
import com.project0.worker.WorkerConstants;
import com.project0.worker.batch.ItemLogListener;
import com.project0.worker.scaping.truyencuoiviet.*;
import org.slf4j.Logger;
import org.springframework.batch.core.job.Job;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.listener.ItemReadListener;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.Step;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.project0.service.shared.model.Article;
import org.springframework.core.task.TaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class TruyenCuoiVietJobConfiguration {

  private Logger logger = LoggerFactory.getLogger(TruyenCuoiVietJobConfiguration.class);

  @Autowired
  JobRepository jobRepository;

  @Autowired
  PlatformTransactionManager transactionManager;

  @Autowired
  ApplicationContext applicationContext;

  @Bean
  @Qualifier(value = WorkerConstants.TRUYEN_CUOI_VIET_SCRAPING)
  public Job articleScrapingJob(Step truyenCuoiVietStep) {
    return new JobBuilder(WorkerConstants.TRUYEN_CUOI_VIET_SCRAPING, jobRepository)
                .start(truyenCuoiVietStep)
                .build();
  }

  @Bean
  public Step truyenCuoiVietStep(ArticleItemReader itemReader, ArticleItemWriter itemWriter,
                                 ArticleItemProcessor itemProcessor, ItemLogListener<Article, Article> logListener,
                                 @Qualifier("stepTaskExecutor") TaskExecutor stepTaskExecutor) {
    return new StepBuilder("truyenCuoiVietStep", jobRepository)
                              .<TruyenCuoiVietArticle, Article>chunk(50, transactionManager)
                              .faultTolerant()
                              .skipLimit(3)
                              .skip(RuntimeException.class)
                              .skipPolicy(new TruyenCuoiVietSkipPolicy())
                              .reader(itemReader)
                              .processor(itemProcessor)
                              .writer(itemWriter)
                              .taskExecutor(stepTaskExecutor)
                              .listener((ItemReadListener)logListener)
                              .build();
  }
}
