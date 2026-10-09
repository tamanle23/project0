package com.unipost.service.exception;

import com.unipost.core.exception.BusinessException;
import com.unipost.core.io.Error;

public class MetadataConflictException extends BusinessException {

    private static final long serialVersionUID = 1L;

    public MetadataConflictException(String message) {
        super(message);
        getErrors().add(Error.builder().code("METADATA_CONFLICT").message(message).build());
        setHttpCode(409);
        setServerSide(false);
    }
}
