package com.unipost.aio;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;

import org.springframework.modulith.Modulithic;

import com.unipost.boot.config.BeanNameGenerator;

@Modulithic(
    systemName = "unipost",
    useFullyQualifiedModuleNames = true
)
@ComponentScan(basePackages = { "com.unipost" }, nameGenerator = BeanNameGenerator.class)
@SpringBootConfiguration
@EnableAutoConfiguration
@ConfigurationPropertiesScan
public class AppConfig {
}
