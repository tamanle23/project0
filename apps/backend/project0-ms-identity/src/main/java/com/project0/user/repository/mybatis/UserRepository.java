package com.project0.user.repository.mybatis;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project0.core.io.PageRequest;
import com.project0.user.controller.request.CompositeUserRole;
import com.project0.user.controller.request.CompositeUserPermission;
import com.project0.user.model.User;

@Mapper
public interface UserRepository {
  public Long count();
  public List<User> find(@Param("pageRequest") PageRequest pageRequest);

  public List<CompositeUserPermission> findAllUserPermissions(@Param("uid") String uid);
  public List<CompositeUserRole> findAllUserRoles(@Param("uid") String uid);
  public List<Map<String, Object>> findAllRoleGroupByPermission(@Param("roleIds") Set<Long> roleIds);
  public List<Map<String, String>> findUsersName(@Param("userUids") List<String> userUids);
}

