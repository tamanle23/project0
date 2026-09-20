package com.project0.worker.service;

import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

import java.util.List;

public interface WorkerProgressService {

  public boolean registerAsyncAckEmitter(List<String> requestIds, ResponseBodyEmitter emitter);

	public void unregisterEmitter(ResponseBodyEmitter emitter);
}
