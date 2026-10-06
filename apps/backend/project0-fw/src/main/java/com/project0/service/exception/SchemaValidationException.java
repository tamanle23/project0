package com.project0.service.exception;

import com.project0.core.exception.BusinessException;
import com.project0.core.io.Error;

import java.util.List;

public class SchemaValidationException extends BusinessException {

    private static final long serialVersionUID = 1L;

    public SchemaValidationException(String message) {
        super(Error.builder().code("SCHEMA_VALIDATION_FAILED").message(message).build());
        setHttpCode(400);
        setServerSide(false);
    }

    public SchemaValidationException(List<Error> errors) {
        super(errors);
        setHttpCode(400);
        setServerSide(false);
    }
}
