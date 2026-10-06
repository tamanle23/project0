package com.unipost.service.exception;

import com.unipost.core.exception.BusinessException;
import com.unipost.core.io.Error;

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
