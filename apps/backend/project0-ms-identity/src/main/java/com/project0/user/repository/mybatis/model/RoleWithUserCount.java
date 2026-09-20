package com.project0.user.repository.mybatis.model;

import com.project0.user.model.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleWithUserCount extends Role {
  Long numberOfUsers;
}
