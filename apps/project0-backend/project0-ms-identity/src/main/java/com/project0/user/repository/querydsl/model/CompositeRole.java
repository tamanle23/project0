package com.project0.user.repository.querydsl.model;

import java.util.List;

import com.project0.user.controller.request.CompositeRolePermission;
import com.project0.user.controller.request.CompositeUserRole;
import com.project0.user.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompositeRole {

  Role role;
  Long numberOfUsers;
  List<CompositeRolePermission> rolePermissions;
  List<CompositeUserRole> userRoles;
}
