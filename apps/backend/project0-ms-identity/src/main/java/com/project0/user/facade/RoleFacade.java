package com.project0.user.facade;

import com.project0.user.controller.request.RoleVm;
import com.project0.user.controller.request.RolePermissionVm;
import com.project0.user.controller.request.UserRoleVm;
import java.util.List;

public interface RoleFacade {
  RoleVm getRoleDetail(String uid);
  List<RolePermissionVm> findAllBelongingPermissions(String uid);
  List<UserRoleVm> findAllBelongingUsers(String uid);
  void updatePermissions(String uid, List<RolePermissionVm> rolePermissions);
  void updateUsers(String uid, List<UserRoleVm> userRoles);
}
