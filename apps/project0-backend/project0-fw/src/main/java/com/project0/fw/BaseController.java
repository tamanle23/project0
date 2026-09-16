package com.project0.fw;

import jakarta.inject.Inject;

import com.project0.core.context.Context;
import com.project0.core.helper.GenerationHelper;

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
