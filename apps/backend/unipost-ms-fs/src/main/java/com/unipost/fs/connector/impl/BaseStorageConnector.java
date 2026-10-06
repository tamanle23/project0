package com.unipost.fs.connector.impl;

import com.unipost.core.helper.GenerationHelper;
import com.unipost.fs.connector.StorageConnector;
import com.unipost.fs.model.FileAttributes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.InputStream;
import java.util.List;

public abstract class BaseStorageConnector implements StorageConnector {

  protected Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  protected GenerationHelper generationHelper;

  @Override
  public final String acquireIdentifier() {
    return generationHelper.generateGuid();
  }

  @Override
  public FileAttributes store(InputStream inputStream) {
    String name = this.acquireIdentifier();
    return this.store(inputStream,0, name);
  }

  @Override
  public void remove(List<FileAttributes> attributes) {
    attributes.forEach(this::remove);
  }
}
