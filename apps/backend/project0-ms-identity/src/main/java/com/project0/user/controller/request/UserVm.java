package com.project0.user.controller.request;

import com.project0.user.controller.response.UserPermissionVm;
import com.project0.user.model.User;
import com.project0.user.model.enums.UserStatus;
import com.project0.user.model.enums.UserType;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserVm {
  private Long id;
  private String uid;
  private String userName;
  private String email;
  private String firstName;
  private String lastName;
  private boolean nonExpired;
  private boolean nonLocked;
  private boolean credentialsNonExpired;
  private UserStatus status;
  private UserType type;

  List<UserPermissionVm> userPermissions;
  List<UserRoleVm> userRoles;
}
