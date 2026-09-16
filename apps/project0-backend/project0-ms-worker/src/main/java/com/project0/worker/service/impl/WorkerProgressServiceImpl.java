package com.project0.worker.service.impl;

import java.io.IOException;
import java.util.List;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;
import com.project0.core.io.Event;
import com.project0.presentation.service.SseEvent;
import com.project0.worker.service.WorkerProgressService;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

@Service
public class WorkerProgressServiceImpl implements WorkerProgressService, ApplicationListener<SseEvent> {

  private static final Logger logger = LoggerFactory.getLogger(WorkerProgressServiceImpl.class);

  Multimap<ResponseBodyEmitter, String> asyncAckEmitterMap = ArrayListMultimap.create();

  @Override
  public boolean registerAsyncAckEmitter(List<String> requestIds, ResponseBodyEmitter emitter) {
    if(CollectionUtils.isNotEmpty(requestIds)) {
      asyncAckEmitterMap.putAll(emitter, requestIds);
      return true;
    }
    logger.info("Emitter's already registered.");
    return false;
  }

  @Override
  public void unregisterEmitter(ResponseBodyEmitter emitter) {
    if (asyncAckEmitterMap.containsKey(emitter)) {
      asyncAckEmitterMap.removeAll(emitter);
    }
  }

  @Override
  public void onApplicationEvent(SseEvent sseEvent) {
    Event event = (Event)sseEvent.getSource();
    if("AsyncAck".equals(event.getAction())) {
      asyncAckEmitterMap.entries()
                        .stream()
                        .filter(entry -> StringUtils.equalsIgnoreCase(entry.getValue(), event.getCorrelation()))
                        .forEach(entry -> {
                          try {
                            entry.getKey().send(event);
                          } catch (IOException e) {
                            entry.getKey().completeWithError(e);
                          }
                        });
    }
  }
}
