package com.unipost.fw;

import jakarta.inject.Inject;

import com.unipost.core.context.Context;
import com.unipost.core.helper.GenerationHelper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class BaseController {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    protected GenerationHelper generationHelper;

    @Inject
    protected Context contextHelper;
}
