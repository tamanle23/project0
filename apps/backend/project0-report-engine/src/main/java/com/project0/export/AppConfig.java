package com.project0.export;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;

import com.project0.boot.config.BeanNameGenerator;

@ComponentScan(basePackages = { "com.project0" }, nameGenerator = BeanNameGenerator.class)
@SpringBootConfiguration
@EnableAutoConfiguration
@ConfigurationPropertiesScan
public class AppConfig {
}
