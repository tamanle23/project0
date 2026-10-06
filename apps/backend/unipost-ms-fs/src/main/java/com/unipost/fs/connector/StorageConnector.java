package com.unipost.fs.connector;

import java.io.InputStream;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import com.unipost.fs.model.FileAttributes;
import com.unipost.fs.model.FileConnector;
import org.springframework.core.io.Resource;

public interface StorageConnector {

  FileAttributes store(InputStream inputStream, long length, String code);

  FileAttributes store(InputStream inputStream);

  void remove(List<FileAttributes> attributes);

  void remove(FileAttributes attributes);

  Stream<Path> list(String prefix);

  Resource loadAsResource(FileAttributes attributes);

  void deleteAll();

  FileConnector getConnector();

  FileAttributes copy(FileAttributes attributes);

  String acquireIdentifier();

}
