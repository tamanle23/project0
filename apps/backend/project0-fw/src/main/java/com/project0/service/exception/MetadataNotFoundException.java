package com.project0.service.exception;

import com.project0.core.exception.BusinessException;
import com.project0.core.io.Error;

public class MetadataNotFoundException extends BusinessException {

    private static final long serialVersionUID = 1L;

    public MetadataNotFoundException(String message) {
        super(Error.builder().code("METADATA_NOT_FOUND").message(message).build());
        setHttpCode(404);
        setServerSide(false);
    }
}
