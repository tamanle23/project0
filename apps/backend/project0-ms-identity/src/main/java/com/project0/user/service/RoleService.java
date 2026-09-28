package com.project0.user.service;

import java.util.List;

import com.project0.core.io.Page;
import com.project0.service.CrudService;
import com.project0.user.dto.CompositeRolePermission;
import com.project0.user.dto.CompositeUserRole;
import com.project0.user.controller.request.RoleSearchCondition;
import com.project0.user.model.Role;
import com.project0.user.repository.mybatis.model.RoleWithUserCount;

public interface RoleService extends CrudService<Role>{

  Page<RoleWithUserCount> findBy(RoleSearchCondition searchRequestBody);

  List<CompositeRolePermission> findAllBelongingPermissions(String uid);

  void updatePermissions(String uid, List<CompositeRolePermission> rolePermissions);

  void updateUsers(String uid, List<CompositeUserRole> userRoles);

  List<CompositeUserRole> findAllBelongingUsers(String uid);
}
