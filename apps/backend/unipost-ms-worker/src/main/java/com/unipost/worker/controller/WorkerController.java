package com.unipost.worker.controller;

import com.unipost.core.exception.BusinessException;
import com.unipost.core.io.ContextHeader;
import com.unipost.core.io.ResponseWrapper;
import com.unipost.fw.CommonController;
import com.unipost.resources.constants.JobConstantResource;
import com.unipost.worker.controller.request.WorkerInput;
import com.unipost.worker.controller.response.WorkerOutput;
import com.unipost.worker.service.WorkerProgressService;
import com.unipost.worker.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

import jakarta.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/worker")
public class WorkerController extends CommonController {

  @Autowired
  WorkerService workerService;

  @Inject
  WorkerProgressService pushService;

  @RequestMapping(value = "/ack/{requestIds}", method = RequestMethod.GET)
  public ResponseBodyEmitter subcribeAsyncRequestAck(@PathVariable List<String> requestIds) {
    final ResponseBodyEmitter emitter = new ResponseBodyEmitter();
    if(pushService.registerAsyncAckEmitter(requestIds, emitter)) {
      emitter.onCompletion(() ->  {
        pushService.unregisterEmitter(emitter);
      });
      emitter.onError(err -> {
        pushService.unregisterEmitter(emitter);
      });
      emitter.onTimeout(() ->  {
        pushService.unregisterEmitter(emitter);
      });
      return emitter;
    }
    throw new BusinessException("Failed to register listener.");
  }

  @PostMapping("/run")
  public ResponseWrapper<ContextHeader, WorkerOutput> run(@RequestBody WorkerInput workerInput) throws Exception {
    return success(workerService.run(this.extractRequest(workerInput)));
  }

  @GetMapping(value="/jobs")
  public ResponseWrapper<ContextHeader, Set<JobConstantResource>> getAllJobNames(){
    return success(
      this.workerService.getAvailableJobs()
                        .stream()
                        .map(j -> JobConstantResource.valueOf(j))
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .collect(Collectors.toSet())
    );
  }
}
