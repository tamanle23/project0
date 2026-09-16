package com.project0.fw;

import java.util.List;

import com.project0.core.context.Context;
import com.project0.core.io.ContextHeader;
import com.project0.core.io.Error;
import com.project0.core.io.ResponseWrapper;
import com.project0.fw.controller.validation.jsr303.ValidationUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.ObjectError;

/**
 * ResponseBuilder.
 * Helper class to build ResponseEntity from ResponseWrapper
 */
@Component
public class ResponseEntityBuilder {

  @Autowired
  protected Context contextHelper;

  public <T>ResponseEntity<ResponseWrapper<ContextHeader, T>> success(HttpStatus status, T payload) {
    return ResponseEntity.status(status)
                         .body(ResponseWrapper.<T>success(contextHelper.getHeader(), payload));
  }

  public <T>ResponseEntity<ResponseWrapper<ContextHeader, T>> success(T payload) {
      return success(HttpStatus.OK,payload);
  }

  public <T>ResponseEntity<ResponseWrapper<ContextHeader, T>> success() {
      return success(HttpStatus.OK,null);
  }

  public <T>ResponseEntity<ResponseWrapper<ContextHeader, T>> error(HttpStatus status, Error... errors) {
      return ResponseEntity.status(status)
                           .body(ResponseWrapper.<T>error(contextHelper.getHeader(), errors));
  }

  public <T>ResponseEntity<ResponseWrapper<ContextHeader, T>> error(Error... errors) {
      return error(HttpStatus.OK,errors);
  }

  public <T>ResponseEntity<ResponseWrapper<ContextHeader, T>> fail(HttpStatus status, Error... errors) {
      return ResponseEntity.status(status).body(ResponseWrapper.<T>fail(contextHelper.getHeader(), errors));
  }

  public <T>ResponseEntity<ResponseWrapper<ContextHeader, T>> fail(Error... errors) {
      return fail(HttpStatus.OK,errors);
  }

  public <T>ResponseEntity<ResponseWrapper<ContextHeader, T>> fail(List<ObjectError> errors) {
    return fail(HttpStatus.OK,ValidationUtils.map(errors));
  }
}
