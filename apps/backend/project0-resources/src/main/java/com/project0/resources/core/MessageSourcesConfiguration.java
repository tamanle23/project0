package com.project0.resources.core;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

@Configuration
public class MessageSourcesConfiguration {

  @Bean(name="resourcesMessageSource")
  public MessageSource enumMessageSource() {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    messageSource.setBasename("enum-messages");
    return messageSource;
  }
}
