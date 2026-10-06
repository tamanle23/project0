package com.project0.service.exception;

import com.project0.core.exception.BusinessException;
import com.project0.core.io.Error;

public class MetadataConflictException extends BusinessException {

    private static final long serialVersionUID = 1L;

    public MetadataConflictException(String message) {
        super(Error.builder().code("METADATA_CONFLICT").message(message).build());
        setHttpCode(409);
        setServerSide(false);
    }
}
