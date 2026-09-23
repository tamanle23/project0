package com.project0.user.repository.mybatis;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project0.core.io.PageRequest;
import com.project0.user.controller.request.UserRoleVm;
import com.project0.user.controller.response.UserPermissionVm;
import com.project0.user.model.User;

@Mapper
public interface UserRepository {
  public Long count();
  public List<User> find(@Param("pageRequest") PageRequest pageRequest);

  public List<UserPermissionVm> findAllUserPermissions(@Param("uid") String uid);
  public List<UserRoleVm> findAllUserRoles(@Param("uid") String uid);
  public List<Map<String, Object>> findAllRoleGroupByPermission(@Param("roleIds") Set<Long> roleIds);
  public List<Map<String, String>> findUsersName(@Param("userUids") List<String> userUids);
}

