package com.project0.worker.scaping.truyencuoiviet;

import com.project0.core.logging.LoggerFactory;
import com.project0.service.shared.model.Article;
import org.slf4j.Logger;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.step.StepExecution;
import org.springframework.batch.core.listener.StepExecutionListener;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.infrastructure.item.ItemReader;
import org.springframework.batch.infrastructure.item.support.IteratorItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@StepScope
@Component
public class ArticleItemReader extends IteratorItemReader<TruyenCuoiVietArticle> implements ItemReader<TruyenCuoiVietArticle>, StepExecutionListener {

  private Logger logger = LoggerFactory.getLogger(ArticleItemReader.class);
  private Article lastArticle;

  @Value("#{jobParameters['fileName']}")
  String fileName;

  public ArticleItemReader(@Autowired TruyenCuoiVietScraper truyenCuoiVietScraper) {
    super(truyenCuoiVietScraper);
  }

  @Override
  public void beforeStep(StepExecution stepExecution) {
  }

  @Override
  public ExitStatus afterStep(StepExecution stepExecution) {
    return stepExecution.getExitStatus();
  }
}
