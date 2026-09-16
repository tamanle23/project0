package com.project0.user.controller;

import java.util.List;

import com.project0.core.constant.ResourceConstants;
import com.project0.core.io.ContextHeader;
import com.project0.user.controller.request.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project0.core.io.Page;
import com.project0.core.io.PageRequest;
import com.project0.core.io.ResponseWrapper;
import com.project0.fw.QueryController;
import com.project0.user.controller.mapping.UserMapper;
import com.project0.user.model.Role;
import com.project0.user.service.RoleService;

@RestController
@RequestMapping(value="api/role")
@CacheConfig(cacheNames = "RoleQuery")
public class RoleQueryController extends QueryController<Role, RoleVm, RoleSearchCondition> {

  @Autowired
  RoleService roleService;

  @Autowired
  UserMapper userMapper;

  @Override
  public String getResourceName() {
    return ResourceConstants.ROLE;
  }

  @GetMapping(value="/_list")
  public ResponseWrapper<ContextHeader, Page<RoleVm>> getSearch(RoleSearchCondition searchCondition){
    return success(
      userMapper.roleToResponseModel(roleService.findBy(searchCondition))
    );
  }

  @PostMapping(value="/_list")
  public ResponseWrapper<ContextHeader, Page<RoleVm>> postSearch(@RequestBody(required = false) RoleSearchCondition searchRequest){
    return success(
      userMapper.roleToResponseModel(roleService.findBy(searchRequest))
    );
  }

  @GetMapping(value="{uid}/permissions")
  public ResponseWrapper<ContextHeader, List<RolePermissionVm>> getAllRolePermissions(@PathVariable String uid, PageRequest pageRequest){
    return success(roleService.findAllBelongingPermissions(uid));
  }

  @GetMapping(value="{uid}/users")
  public ResponseWrapper<ContextHeader, List<UserRoleVm>> getBelongingUsers(@PathVariable String uid, PageRequest pageRequest){
    return success(roleService.findAllBelongingUsers(uid));
  }

  @GetMapping(value="{uid}/_with_permissions")
  public ResponseWrapper<ContextHeader, RoleVm> getRoleDetail(@PathVariable String uid, PageRequest pageRequest){
    return success(roleService.getRoleDetail(uid));
  }
}
