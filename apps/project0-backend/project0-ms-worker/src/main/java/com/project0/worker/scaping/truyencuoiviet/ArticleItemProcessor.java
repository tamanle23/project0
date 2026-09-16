package com.project0.worker.scaping.truyencuoiviet;

import com.project0.core.logging.LoggerFactory;
import com.project0.service.shared.model.Article;
import com.project0.worker.batch.BatchItemException;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.step.StepExecution;
import org.springframework.batch.core.listener.StepExecutionListener;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.infrastructure.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@StepScope
@Component
public class ArticleItemProcessor implements ItemProcessor<TruyenCuoiVietArticle, Article>, StepExecutionListener {

  private Logger logger = LoggerFactory.getLogger(ArticleItemProcessor.class);

  @Override
  public void beforeStep(StepExecution stepExecution) {
  }

  @Override
  public ExitStatus afterStep(StepExecution stepExecution) {
    return stepExecution.getExitStatus();
  }

  @Override
  public Article process(TruyenCuoiVietArticle item) throws Exception {
    if(StringUtils.isBlank(item.getContent())) {
      throw new BatchItemException(true, "Article's content is empty. " + item.getHref());
    }
    return Article.builder()
                  .contentType(0)
                  .code(DigestUtils.sha1Hex(item.getHref()))
                  .description(item.getHref())
                  .header(item.getHeader())
                  .summary(StringUtils.substring(item.getSummary(), 0, 500))
                  .content(item.getContent())
                  .tag(Arrays.asList(item.getCategory(), "scraping","s:truyencuoiviet.com"))
      .build();
  }
}
