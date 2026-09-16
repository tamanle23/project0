package com.project0.core.io;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Filter<T> {

  String field;
  String contentType;
  T value;
}
