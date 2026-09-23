package com.project0.user.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

import com.project0.domain.BaseModel;
import com.project0.user.controller.mapping.RoleMapper;
import com.project0.user.controller.request.RoleVm;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project0.core.io.Page;
import com.project0.service.BaseModelService;
import com.project0.user.controller.request.RolePermissionVm;
import com.project0.user.controller.request.UserRoleVm;
import com.project0.user.controller.request.RoleSearchCondition;
import com.project0.user.model.Permission;
import com.project0.user.model.Role;
import com.project0.user.model.RolePermission;
import com.project0.user.model.User;
import com.project0.user.model.UserRole;
import com.project0.user.repository.jpa.PermissionRepository;
import com.project0.user.repository.jpa.RolePermissionRepository;
import com.project0.user.repository.jpa.RoleRepository;
import com.project0.user.repository.jpa.UserRepository;
import com.project0.user.repository.jpa.UserRoleRepository;
import com.project0.user.repository.mybatis.model.RoleWithUserCount;
import com.project0.user.service.RoleService;

@Transactional
@Service
public class RoleServiceImpl extends BaseModelService<Role, RoleRepository> implements RoleService {

  @Autowired
  RolePermissionRepository rolePermissionRepository;

  @Autowired
  UserRoleRepository accountRoleRepository;

  @Autowired
  PermissionRepository permissionRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  com.project0.user.repository.mybatis.RoleRepository mRoleRepository;

  @Autowired
  RoleMapper roleMapper;

  @Override
  public Page<RoleWithUserCount> findBy(RoleSearchCondition searchRequest) {
    Page<RoleWithUserCount> page = Page.<RoleWithUserCount>builder()
            .totalElements(mRoleRepository.count(searchRequest))
            .content(mRoleRepository.findWithUserCount(searchRequest))
            .build();
    page.setNumber(searchRequest.getPageRequest().getNumber());
    page.setTotalPages((page.getTotalElements() / searchRequest.getPageRequest().getSize()) + 1);
    page.setSize(searchRequest.getPageRequest().getSize());
    return page;
  }

  @Override
  public List<RolePermissionVm> findAllBelongingPermissions(String uid) {
    return mRoleRepository.findAllRolePermissions(uid);
  }

  @Override
  public List<UserRoleVm> findAllBelongingUsers(String uid) {
    return mRoleRepository.findAllRoleUsers(uid);
  }

  @Override
  public RoleVm getRoleDetail(String uid) {
      Role role = this.repository.findOneByUid(uid);
      RoleVm roleVm = this.roleMapper.roleToResponseModel(role);
      roleVm.setRolePermissions(mRoleRepository.findAllRolePermissions(uid));
      roleVm.setRoleUsers(mRoleRepository.findAllRoleUsers(uid));
      return roleVm;
  }

  @Override
  public void updatePermissions(String uid, List<RolePermissionVm> rolePermissions) {
    Role role = this.repository.findOneByUid(uid);
    List<RolePermissionVm> newRolePermissions = new ArrayList<>();
    List<RolePermissionVm> removingRolePermissions = new ArrayList<>();
    for(RolePermissionVm cRolePermission:rolePermissions){
      if(BooleanUtils.isTrue(cRolePermission.getEnabled())){
        newRolePermissions.add(cRolePermission);
      } else if (cRolePermission.getId() != null) {
        removingRolePermissions.add(cRolePermission);
      }
    }

    if(CollectionUtils.isNotEmpty(removingRolePermissions)) {
      rolePermissionRepository.deleteByIdIn(removingRolePermissions.stream()
                                                                   .map(RolePermissionVm::getId)
                                                                   .collect(Collectors.toList()));
    }
    if(CollectionUtils.isNotEmpty(newRolePermissions)) {
      Map<Long, Permission> permissionMap = permissionRepository.findAllByIdIn(
                                                                    newRolePermissions.stream().map(entity -> entity.getPermission().getId()).collect(Collectors.toList())
                                                                )
                                                                .stream()
                                                                .collect(Collectors.toMap(Permission::getId, Function.identity()));
      List<RolePermission> permissions = newRolePermissions.stream()
                                                            .map(centity -> RolePermission.builder()
                                                              .permission(permissionMap.get(centity.getPermission().getId()))
                                                              .role(role)
                                                              .build())
                                                            .collect(Collectors.toList());
      rolePermissionRepository.saveAll(permissions);
    }
  }

  @Override
  public void updateUsers(String uid, List<UserRoleVm> userRoles) {
    Role role = this.repository.findOneByUid(uid);
    List<UserRoleVm> newUserRoles = new ArrayList<>();
    List<UserRoleVm> removingUserRoles = new ArrayList<>();
    for(UserRoleVm cUserRole:userRoles) {
      if(BooleanUtils.isTrue(cUserRole.getEnabled())){
        newUserRoles.add(cUserRole);
      } else {
        if(cUserRole.getUid()!=null) {
          removingUserRoles.add(cUserRole);
        }
      }
    }

    if(CollectionUtils.isNotEmpty(removingUserRoles)) {
      accountRoleRepository.deleteByUidIn(removingUserRoles.stream()
                                                                   .map(UserRoleVm::getUid)
                                                                   .collect(Collectors.toSet()));
    }
    if(CollectionUtils.isNotEmpty(newUserRoles)) {
      Map<Long,User> accountMap = userRepository.findAllByUidIn(newUserRoles.stream()
                                                                .map(entity->entity.getUser().getUid())
                                                                .collect(Collectors.toSet()))
                                                               .stream()
                                                               .collect(Collectors.toMap(BaseModel::getId,Function.identity()));
      accountRoleRepository.saveAll(
          newUserRoles.stream()
                            .map(centity->UserRole.builder()
                                                        .user(accountMap.get(centity.getUser().getId()))
                                                        .role(role)
                                                        .build())
                            .collect(Collectors.toList()));
    }

  }
}
