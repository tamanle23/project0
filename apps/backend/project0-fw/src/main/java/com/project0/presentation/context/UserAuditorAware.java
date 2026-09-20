package com.project0.presentation.context;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;

import com.project0.core.context.Context;

public class UserAuditorAware implements AuditorAware<String> {

  @Autowired
  Context contextHelper;

  @Override
  public Optional<String> getCurrentAuditor() {
    return Optional.ofNullable(contextHelper.getAuthenticationUser());
  }
}