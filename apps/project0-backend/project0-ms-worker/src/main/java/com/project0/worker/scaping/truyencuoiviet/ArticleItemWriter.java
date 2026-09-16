package com.project0.worker.scaping.truyencuoiviet;

import com.project0.core.logging.LoggerFactory;
import com.project0.service.shared.ArticleService;
import com.project0.service.shared.model.Article;
import com.project0.worker.batch.BaseItemWriter;
import org.slf4j.Logger;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.step.StepExecution;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.infrastructure.item.Chunk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@StepScope
@Component
public class ArticleItemWriter extends BaseItemWriter<Article> {

  Logger logger = LoggerFactory.getLogger(ArticleItemWriter.class);

  @Autowired
  ArticleService articleService;

  @Override
  public void write(Chunk<? extends Article> items) throws Exception {
    logger.info("Write articles: {}", items.size());
    articleService.createArticles(new ArrayList<>(items.getItems()));
    itemCount += items.size();
  }

  @Override
  public void beforeStep(StepExecution stepExecution) {
  }

  @Override
  public ExitStatus afterStep(StepExecution stepExecution) {
    logger.info("Finishing... {} of items written.", itemCount);
    return null;
  }
}
