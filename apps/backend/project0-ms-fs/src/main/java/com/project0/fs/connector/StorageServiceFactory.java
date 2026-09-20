package com.project0.fs.connector;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.project0.fs.model.FileConnector;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class StorageServiceFactory implements ApplicationContextAware{

  private Map<FileConnector, StorageConnector> connectorsMap;

  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    connectorsMap = applicationContext.getBeansOfType(StorageConnector.class)
                                      .values()
                                      .stream()
                                      .collect(Collectors.toMap(StorageConnector::getConnector, Function.identity()));
  }

  public StorageConnector getConnector(FileConnector connector) {
    return Optional.ofNullable(this.connectorsMap.get(connector)).orElseGet(()->this.connectorsMap.get(FileConnector.DEFAULT_CONNECTOR));
  }
}
