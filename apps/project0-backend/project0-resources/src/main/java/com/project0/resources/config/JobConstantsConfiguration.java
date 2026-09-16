package com.project0.resources.config;

import com.project0.resources.core.BaseConfiguration;
import com.project0.resources.core.YamlPropertySourceFactory;
import com.project0.resources.constants.EnumPrefixConstants;
import com.project0.resources.constants.JobConstantResource;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
@ConfigurationProperties
@PropertySource(value = "classpath:job-constants.yml", factory = YamlPropertySourceFactory.class)
@Getter
@Setter
public class JobConstantsConfiguration extends BaseConfiguration<JobConstantResource> {

  private List<JobConstantResource> jobConstants;

  @Override
  protected String resourcePrefix() {
    return EnumPrefixConstants.JOB_CONSTANT;
  }

  @Override
  protected List<JobConstantResource> getLoadingData() {
    return this.jobConstants;
  }
}
