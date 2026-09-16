package com.project0.user.repository.querydsl.model;

import java.time.LocalDateTime;
import java.util.Set;

import com.project0.domain.Project;
import com.project0.user.model.Permission;
import com.project0.user.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompositePermission {

  Long id;
  User user;
  Permission permission;
  Project project;
  Byte status;
  Set<String> inheritingRoles;
  Long version;
  LocalDateTime lastUpdatedDate;
}
