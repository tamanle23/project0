package com.project0.service.shared;

import com.project0.core.io.ContextHeader;
import com.project0.core.io.ResponseWrapper;
import com.project0.service.shared.model.Article;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@ConditionalOnProperty(prefix = "application.serviceEndpoints" , value = "cms")
@FeignClient("${application.serviceEndpoints.cms}")
public interface ArticleService {

  @PostMapping(value="/api/article/_multi")
  public ResponseWrapper<ContextHeader, List<Map<String, Object>>> createArticles(@RequestBody List<Article> articles);
}
