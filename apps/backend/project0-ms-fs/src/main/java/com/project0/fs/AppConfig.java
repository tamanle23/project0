package com.project0.fs;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.project0.boot.config.BeanNameGenerator;
import com.project0.fs.connector.StorageServiceFactory;

@ComponentScan(basePackages = { "com.project0" }, nameGenerator = BeanNameGenerator.class)
@SpringBootConfiguration
@EnableAutoConfiguration
@ConfigurationPropertiesScan
public class AppConfig {


  @Bean
  CommandLineRunner init(final StorageServiceFactory storageServiceFactory) {
      return new CommandLineRunner(){
          @Override
          public void run(String... args) throws Exception {
              //storageService.deleteAll();
          }};

  }
}
