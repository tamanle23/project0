package com.project0.user.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project0.user.dto.CompositeRolePermission;
import com.project0.user.controller.request.RoleSearchCondition;
import com.project0.user.controller.request.RoleVm;
import com.project0.user.dto.CompositeUserRole;
import com.project0.user.repository.mybatis.model.RoleWithUserCount;

@Mapper
public interface RoleRepository {
  public Long count(@Param("searchRequest") RoleSearchCondition searchRequest);
  public List<RoleWithUserCount> findWithUserCount(@Param("searchRequest") RoleSearchCondition searchRequest);

  public List<CompositeRolePermission> findAllRolePermissions(@Param("uid") String uid);
  public List<CompositeUserRole> findAllRoleUsers(@Param("uid") String uid);
  public List<RoleVm> findAllRolesWithUserCount(@Param("offset") long offset, @Param("size") long size);
}

