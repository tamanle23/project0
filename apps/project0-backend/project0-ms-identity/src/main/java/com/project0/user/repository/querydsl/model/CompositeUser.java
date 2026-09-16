package com.project0.user.repository.querydsl.model;

import java.util.List;

import com.project0.user.controller.request.CompositeUserRole;
import com.project0.user.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompositeUser {

  User user;
  List<CompositePermission> userPermissions;
  List<CompositeUserRole> userRoles;
}
