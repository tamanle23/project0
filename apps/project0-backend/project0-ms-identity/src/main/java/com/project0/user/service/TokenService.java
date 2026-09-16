package com.project0.user.service;

import com.project0.core.io.ContextHeader;
import com.project0.core.io.RequestWrapper;
import com.project0.core.io.ResponseWrapper;
import com.project0.domain.AuthenticationToken;
import com.project0.user.controller.request.AuthenticationRequestBody;

public interface TokenService {

  ResponseWrapper<ContextHeader, AuthenticationToken> getToken(
      RequestWrapper<ContextHeader, AuthenticationRequestBody> request);

  ResponseWrapper<ContextHeader, AuthenticationToken> refreshToken(
      RequestWrapper<ContextHeader, AuthenticationToken> request);

  void logout();
}
