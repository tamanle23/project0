package com.project0.fw.core.jwt;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

import jakarta.inject.Inject;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.project0.core.logging.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project0.core.context.Context;

import io.jsonwebtoken.Claims;

public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

  Logger logger = LoggerFactory.getLogger(JwtAuthenticationTokenFilter.class);

  @Value("${application.security.jwtTokenHeader}")
  private String tokenHeaderName;

  @Value("${application.security.jwtCookieName}")
  private String jwtCookieName;

  @Value("${application.security.tokenUrl}")
  private String tokenUrl;

  @Value("${application.security.tokenInvalidateUrl}")
  private String tokenInvalidateUrl;
  @Inject
  private JwtTokenHelper jwtTokenHelper;

  @Inject
  private Context context;

  public Optional<JwtAuthenticationToken> attemptAuthentication(HttpServletRequest request, String authenticationToken) {
    String userAgent = request.getHeader("User-Agent");
    return Optional.ofNullable(authenticationToken)
                   .map(t -> jwtTokenHelper.getClaims(t))
                   .filter(Optional::isPresent)
                   .map(Optional::get)
                   .filter(c -> jwtTokenHelper.validate(c, userAgent))
                   .map(c -> {
                     Optional<String> usernameOpt = jwtTokenHelper.getUsername(c);
                     List<GrantedAuthority> authorities = jwtTokenHelper.getAuthorities(c);
                     if(usernameOpt.isPresent()) {
                       JwtAuthenticationToken authentication = new JwtAuthenticationToken(usernameOpt.get(), c, authorities);
                       authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                       if(logger.isDebugEnabled()) {
                         logger.debug("authenticated user {}, setting security context", usernameOpt.get());
                       }
                       return authentication;
                     }
                     return null;
                   });
  }

  private Optional<String> readCookie(HttpServletRequest request,String key) {
    return Optional.ofNullable(request.getCookies())
                    .map(Arrays::stream)
                    .orElse(Stream.empty())
                    .filter(c -> key.equals(c.getName()))
                    .map(Cookie::getValue)
                    .findAny();
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String header = Optional.ofNullable(this.tokenHeaderName)
                            .map(request::getHeader)
                            .map(String.class::cast)
                            .filter(Objects::nonNull)
                            .filter(t -> t.startsWith("Bearer "))
                            .map(t -> t.substring(7))
                            .orElse(null);
    String authenticationToken = this.readCookie(request, jwtCookieName).orElse(header);
    String path = request.getRequestURI();

    if (StringUtils.isBlank(authenticationToken) || path.endsWith(this.tokenUrl)) {
      filterChain.doFilter(request, response);
      return;
    }

    if (logger.isDebugEnabled()) {
      logger.debug("Authenticate Jwt");
    }
    Optional<JwtAuthenticationToken> authResult = attemptAuthentication(request, authenticationToken);
    if (!authResult.isPresent()) {
      SecurityContextHolder.clearContext();
      response.setStatus(HttpStatus.UNAUTHORIZED.value());
      return;
    }
    SecurityContextHolder.getContext().setAuthentication(authResult.get());
    context.init(authenticationToken);
    filterChain.doFilter(request, response);
    context.clear();
  }
}
