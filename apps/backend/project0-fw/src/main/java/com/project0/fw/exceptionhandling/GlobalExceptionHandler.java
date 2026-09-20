package com.project0.fw.exceptionhandling;

import com.project0.core.exception.BusinessException;
import com.project0.core.exception.ErrorCodes;
import com.project0.core.io.Error;
import com.project0.core.io.ContextHeader;
import com.project0.core.io.ResponseWrapper;
import com.project0.fw.ResponseEntityBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
  private final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @Autowired
  protected ResponseEntityBuilder responseBuilder;

  @ExceptionHandler(value = { BusinessException.class})
  protected ResponseEntity<ResponseWrapper<ContextHeader, Object>> handleBusinessException(BusinessException ex) {
    if (this.logger.isErrorEnabled()) {
      this.logger.error("Debug error: ", ex);
    }
    if(ex.getHttpCode() == null) {
      if(ex.isServerSide()){
        return responseBuilder.error(ex.getErrors().toArray(new Error[0]));
      }
      return responseBuilder.fail(ex.getErrors().toArray(new Error[0]));
    } else {
      return responseBuilder.error(HttpStatus.valueOf(ex.getHttpCode()),ex.getErrors().toArray(new Error[0]));
    }
  }

  @ExceptionHandler(value = { AccessDeniedException.class})
  protected ResponseEntity<ResponseWrapper<ContextHeader, Object>> handleAccessDeniedException(AccessDeniedException ex) {
    if(this.logger.isErrorEnabled()){
      this.logger.error("Debug error: ",ex);
    }
    return responseBuilder.error(Error.builder().code(ErrorCodes.ERROR_ACCESS_DENIED.name()).message(ErrorCodes.ERROR_ACCESS_DENIED.getMessage()).build());
  }

  @ExceptionHandler(value = { RuntimeException.class})
  protected ResponseEntity<ResponseWrapper<ContextHeader, Object>> handleRuntimeException(RuntimeException ex) {
      if(this.logger.isErrorEnabled()){
          this.logger.error("Debug error: ",ex);
      }
      return responseBuilder.error(Error.builder().code(ErrorCodes.NONE.name()).message(ex.getMessage()).build());
  }

  @ExceptionHandler(value = { HttpMessageConversionException.class})
  protected ResponseEntity<ResponseWrapper<ContextHeader, Object>> handleHttpMessageConversionException(RuntimeException ex) {
    if (this.logger.isErrorEnabled()) {
      this.logger.error("Debug error: ", ex);
    }
    return responseBuilder.fail(Error.builder().code(ErrorCodes.FAIL_ENDPOINT_MAPPING.name()).message(ex.getMessage()).build());
  }

  @ExceptionHandler(value = { Exception.class})
  protected ResponseEntity<ResponseWrapper<ContextHeader, Object>> handleThrowable(Throwable ex) {
    if(this.logger.isErrorEnabled()){
        this.logger.error("Debug error: ",ex);
    }
    return responseBuilder.error(Error.builder().code(ErrorCodes.NONE.name()).message(ex.getMessage()).build());
  }
}
