package com.project0.cache.exchange;

public interface Transformer<T> {
  
  String getId();
  byte[] encode(T object);
  T decode(byte[] bytes);
}
