package com.project0.fs.model;

import com.project0.domain.AbstractEnum;

public class FileConnector extends AbstractEnum<Integer>{

  public FileConnector(int value, String name) {
    super(value, name);
  }

  public static final FileConnector DEFAULT_CONNECTOR = new FileConnector(0,"DEFAULT");
  public static final FileConnector S3 = new FileConnector(1,"S3");
  public static final FileConnector GOOGLE_DRIVE = new FileConnector(2,"GOOGLE_DRIVE");

}
