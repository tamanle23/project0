package com.unipost.resources.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.unipost.resources.core.BaseConfiguration;
import com.unipost.resources.core.YamlPropertySourceFactory;
import com.unipost.resources.constants.EnumPrefixConstants;
import com.unipost.resources.constants.SwitchFlagResource;

import lombok.Getter;
import lombok.Setter;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
@ConfigurationProperties
@PropertySource(value = "classpath:switch-flag.yml", factory = YamlPropertySourceFactory.class)
@Getter
@Setter
public class SwitchFlagConfiguration extends BaseConfiguration<SwitchFlagResource> {

  private List<SwitchFlagResource> switchFlags;

  @Override
  protected String resourcePrefix() {
    return EnumPrefixConstants.SWITCH_FLAG;
  }

  @Override
  protected List<SwitchFlagResource> getLoadingData() {
    return this.switchFlags;
  }
}
