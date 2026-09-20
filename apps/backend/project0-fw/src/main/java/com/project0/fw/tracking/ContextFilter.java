package com.project0.fw.tracking;

import java.io.IOException;
import java.nio.charset.Charset;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.project0.core.context.Context;
import com.project0.core.io.ContextHeader;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.core.MethodParameter;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.util.ContentCachingResponseWrapper;

public class ContextFilter extends CommonsRequestLoggingFilter  {
  private static final Logger logger = LoggerFactory.getLogger(ContextFilter.class);
  private static final long DEFAULT_WARN_NANOS = TimeUnit.SECONDS.toNanos(3L);
  private static final String MDC_TRACKING_ID = "MDC_TRACKING_ID";
  private static final String MDC_APPLICATION_ID = "MDC_APPLICATION_ID";
  private static final String MDC_REQUEST_METHOD = "MDC_REQUEST_METHOD";


  private static final String X_USER_ID = "X-USER-ID";
  private static final String X_REQUEST_ID = "X-REQUEST-ID";
  private static final String X_TRANSACTION_ID = "X-TRANSACTION-ID";
  private static final String X_TIMEZONE = "X-TIMEZONE";
  private static final String X_REQUEST_AT = "X-REQUEST-AT";
  private static final String X_REQUEST_AT_SERVER = "X-REQUEST-AT-SERVER";
  private static final String X_RESPONSE_AT_SERVER = "X-RESPONSE-AT-SERVER";
  private static final String X_AUTHORIZATION = "Authorization";
  private static final String X_APPLICATION = "X-APPLICATION";
  private static final String X_SESSION_ID = "X-SESSION-ID";

  private long warnHandlingNanos;
  private Context contextHelper;
  private String applicationName;


  public ContextFilter(Context contextHelper, String applicationName) {
    this.contextHelper = contextHelper;
    this.applicationName = applicationName;
    this.warnHandlingNanos = DEFAULT_WARN_NANOS;
  }

  protected static String buildMethodParams(HandlerMethod handlerMethod) {
    MethodParameter[] params = handlerMethod.getMethodParameters();
    List<String> lst = new ArrayList<>(params.length);
    for (MethodParameter p : params) {
      lst.add(p.getParameterType().getSimpleName());
    }
    return lst.stream().collect(Collectors.joining(","));
  }

  public void setWarnHandlingNanos(long warnHandlingNanos) {
    this.warnHandlingNanos = warnHandlingNanos;
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
      String path = request.getServletPath();
      return path.startsWith("/ping") || path.startsWith("/resources");
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String userAgent = request.getHeader("User-Agent");
    ContextHeader requestContext = contextHelper.createHeader(applicationName, userAgent);
    HttpSession session = request.getSession(true);
    requestContext.setRequestId(request.getHeader(X_REQUEST_ID));
    requestContext.setTimeZone(request.getHeader(X_TIMEZONE));
    if(StringUtils.isNoneBlank(request.getHeader(X_REQUEST_AT))) {
      requestContext.setRequestAtClient(ZonedDateTime.parse(request.getHeader(X_REQUEST_AT)));
    }
    requestContext.setRequestAtServer(ZonedDateTime.now());
    MDC.put(MDC_APPLICATION_ID, applicationName);
    MDC.put(MDC_TRACKING_ID, String.format("%s_%s", requestContext.getTransactionId()
                                          , requestContext.getRequestId()));

    long startTime = System.nanoTime();
    String ipAddress = request.getHeader("X-FORWARDED-FOR");
    String contentType = request.getHeader("Content-Type");
    if (ipAddress == null) {
      ipAddress = request.getRemoteAddr();
    }
    String queryString = request.getQueryString();
    StringBuilder requestInfo = new StringBuilder("");
    requestInfo.append(String.format("Host: %s Url: %s %s QueryParams=%s Method: %s ContentType: %s - %s"
      , ipAddress
      , request.getMethod()
      , request.getRequestURL()
      , (queryString!=null ? queryString: "")
      , request.getMethod()
      , contentType
      , userAgent)
    );
    logger.debug("[START REQUEST]");
    logger.debug(requestInfo.toString());
    if(request instanceof HttpServletRequest){
      if(logger.isTraceEnabled() && ("application/json".equals(contentType) || "application/xml".equals(contentType))){
        request = new MultiReadHttpServletRequest(request);
        response = new ContentCachingResponseWrapper(response);
      }
    }
    response.setHeader(X_REQUEST_ID, requestContext.getRequestId());
    response.setHeader(X_TRANSACTION_ID, requestContext.getTransactionId());
    response.setHeader(X_TIMEZONE, requestContext.getTimeZone());
    response.setHeader(X_APPLICATION, requestContext.getApplication());
    response.setHeader(X_SESSION_ID, session.getId());
    try {
      filterChain.doFilter(request, response);
    } finally {
      long handlingTime = System.nanoTime() - startTime;
      String formattedHandlingTime = String.format("%1$,3d", TimeUnit.MILLISECONDS.toSeconds(handlingTime));
      boolean isWarnHandling = handlingTime > this.warnHandlingNanos;
      if(logger.isTraceEnabled() && request instanceof MultiReadHttpServletRequest && response instanceof ContentCachingResponseWrapper) {
        logger.trace("Request payload: {}", IOUtils.toString(request.getInputStream()), request.getContentType());
        logger.trace("Response payload: {}", IOUtils.toString(((ContentCachingResponseWrapper)response).getContentInputStream()), response.getContentType());
        logger.trace("Status: {}",response.getStatus());
        ((ContentCachingResponseWrapper)response).copyBodyToResponse();
      }
      String handlingTimeMessage = "[END REQUEST] HANDLING TIME: {} ms";
      if (isWarnHandling && logger.isWarnEnabled()) {
        logger.warn(handlingTimeMessage + " > {}", formattedHandlingTime, TimeUnit.MILLISECONDS.toSeconds(this.warnHandlingNanos));
      } else {
        logger.debug(handlingTimeMessage, new Object[] { formattedHandlingTime });
      }
      requestContext.setResponseAtServer(ZonedDateTime.now());
      response.setHeader(X_RESPONSE_AT_SERVER, requestContext.getResponseAtServer().toString());
      MDC.clear();
      contextHelper.clear();
    }
  }
}
