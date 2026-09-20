package com.project0.aio;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;

import org.springframework.modulith.Modulithic;

import com.project0.boot.config.BeanNameGenerator;

@Modulithic(
    systemName = "project0",
    useFullyQualifiedModuleNames = true
)
@ComponentScan(basePackages = { "com.project0" }, nameGenerator = BeanNameGenerator.class)
@SpringBootConfiguration
@EnableAutoConfiguration
@ConfigurationPropertiesScan
public class AppConfig {
}
