package com.project0.service.shared;

import java.util.List;
import java.util.Map;

import com.project0.core.io.ContextHeader;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project0.core.io.ResponseWrapper;

@ConditionalOnProperty(prefix = "application.serviceEndpoints" , value = "identity")
@FeignClient("${application.serviceEndpoints.identity}")
public interface UserService {

  @PostMapping(value="/api/user/_names")
  public ResponseWrapper<ContextHeader, Map<String, String>> getUsersName(@RequestBody List<String> userUids);
}
