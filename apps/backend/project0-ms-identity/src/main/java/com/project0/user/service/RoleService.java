package com.project0.user.service;

import java.util.List;

import com.project0.core.io.Page;
import com.project0.service.CrudService;
import com.project0.user.controller.request.RolePermissionVm;
import com.project0.user.controller.request.RoleVm;
import com.project0.user.controller.request.UserRoleVm;
import com.project0.user.controller.request.RoleSearchCondition;
import com.project0.user.model.Role;
import com.project0.user.repository.mybatis.model.RoleWithUserCount;

public interface RoleService extends CrudService<Role>{

  Page<RoleWithUserCount> findBy(RoleSearchCondition searchRequestBody);

  RoleVm getRoleDetail(String uid);

  List<RolePermissionVm> findAllBelongingPermissions(String uid);

  void updatePermissions(String uid, List<RolePermissionVm> rolePermissions);

  void updateUsers(String uid, List<UserRoleVm> userRoles);

  List<UserRoleVm> findAllBelongingUsers(String uid);
}
