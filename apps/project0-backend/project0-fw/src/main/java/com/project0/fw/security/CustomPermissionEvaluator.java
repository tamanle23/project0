package com.project0.fw.security;

import com.project0.core.constant.PermissionConstants;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

public class CustomPermissionEvaluator implements PermissionEvaluator {
  @Override
  public boolean hasPermission(Authentication auth, Object targetDomainObject, Object permission) {
    if ((auth == null) || !(targetDomainObject instanceof String) || (targetDomainObject == null) || !(permission instanceof String)) {
      return false;
    }
    String targetType = (String) targetDomainObject;
    return hasPrivilege(auth, targetType, permission.toString());
  }

  @Override
  public boolean hasPermission(Authentication auth, Serializable targetId, String targetDomainObject, Object permission) {
    if ((auth == null) || !(targetDomainObject instanceof String) || (targetDomainObject == null) || !(permission instanceof String)) {
      return false;
    }
    String targetType = (String) targetDomainObject;
    return hasPrivilege(auth, targetType, permission.toString());
  }

  private boolean hasPrivilege(Authentication auth, String targetType, String permission) {
    String combiPermission = (targetType + "_" + permission).toUpperCase();
    if(auth != null) {
      return auth.getAuthorities()
                 .stream()
                 .anyMatch(grant -> (grant.getAuthority().equals(combiPermission)) || (permission.equalsIgnoreCase(PermissionConstants.LIST) && grant.getAuthority().equalsIgnoreCase("ROLE_ADMINISTRATOR")));
    }
    return false;
  }
}
