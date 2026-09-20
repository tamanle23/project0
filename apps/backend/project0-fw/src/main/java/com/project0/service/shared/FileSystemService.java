package com.project0.service.shared;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project0.core.io.ContextHeader;
import com.project0.core.io.ResponseWrapper;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface FileSystemService {

  ResponseWrapper<ContextHeader, List<Map>> upload(String uid, InputStream fileStream, String name, String fieldName, String contentType) throws JsonProcessingException;
}
