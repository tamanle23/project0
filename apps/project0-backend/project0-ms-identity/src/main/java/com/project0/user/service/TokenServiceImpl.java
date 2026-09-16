package com.project0.user.service;

import java.util.Optional;

import com.project0.core.exception.ErrorCodes;
import com.project0.core.io.ContextHeader;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project0.core.context.Context;
import com.project0.core.exception.BusinessException;
import com.project0.core.helper.GenerationHelper;
import com.project0.core.io.CommonReponseBuilder;
import com.project0.core.io.RequestWrapper;
import com.project0.core.io.ResponseWrapper;
import com.project0.core.logging.LoggerFactory;
import com.project0.domain.AuthenticationToken;
import com.project0.fw.core.jwt.JwtTokenHelper;
import com.project0.service.authentication.UserDetailsImpl;
import com.project0.user.controller.request.AuthenticationRequestBody;
import com.project0.user.model.User;

@Service
@Transactional
public class TokenServiceImpl extends CommonReponseBuilder implements TokenService {

  Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  UserService<User> userService;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  JwtTokenHelper jwtHelper;

  @Autowired
  Context context;

  @Autowired
  protected GenerationHelper generationHelper;

  @Override
  protected Context getContext() {
    return context;
  }

  public ResponseWrapper<ContextHeader, AuthenticationToken> getToken(RequestWrapper<ContextHeader,AuthenticationRequestBody> request) {
    this.authenticate(request.getBody().getUserName(), request.getBody().getPassword());
    final UserDetailsImpl userDetails = userService.loadUserByUserName(request.getBody().getUserName());
    return success(jwtHelper.generateToken(userDetails, request.getHeader().getClientType()));
  }

  public ResponseWrapper<ContextHeader, AuthenticationToken> refreshToken(RequestWrapper<ContextHeader, AuthenticationToken> request) {
    // TODO: need to verify token-refreshToken pair
    Optional<String> tokenOpt = jwtHelper.refreshToken(request.getBody().getToken());
    if(tokenOpt.isPresent()) {
      return success(AuthenticationToken.builder().token(tokenOpt.get()).refreshToken(request.getBody().getRefreshToken()).build());
    }
    throw BusinessException.create().add(ErrorCodes.ERROR).setHttpCode(HttpStatus.UNAUTHORIZED.value());
  }

  private void authenticate(String username, String password) {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      logger.error("ERROR occured: ", e);
      throw BusinessException.create().add(ErrorCodes.ERROR_USER_DISABLED);
    } catch (BadCredentialsException e) {
      logger.error("ERROR occured: ", e);
      throw BusinessException.create().add(ErrorCodes.ERROR_LOGIN_INVALID_CREDENTIALS);
    }
  }

  @Override
  public void logout() {
  }
}
