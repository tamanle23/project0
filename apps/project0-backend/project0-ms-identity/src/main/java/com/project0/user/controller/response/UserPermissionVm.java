package com.project0.user.controller.response;

import com.project0.user.controller.request.PermissionVm;
import com.project0.user.controller.request.UserVm;
import com.project0.user.model.Permission;
import com.project0.user.model.User;
import com.project0.user.model.UserPermission;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPermissionVm {

  Long id;
  UserVm user;
  PermissionVm permission;
  Byte status;
  Set<String> inheritingRoles;
  Long version;
  LocalDateTime lastUpdatedDate;
  Boolean enabled;
}
