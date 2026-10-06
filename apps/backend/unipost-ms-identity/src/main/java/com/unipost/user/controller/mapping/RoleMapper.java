package com.unipost.user.controller.mapping;

import com.unipost.core.io.Page;
import com.unipost.user.controller.request.RoleVm;
import com.unipost.user.controller.request.UserVm;
import com.unipost.user.controller.response.UserProfileVm;
import com.unipost.user.model.Role;
import com.unipost.user.model.User;
import com.unipost.user.model.UserProfile;
import com.unipost.user.repository.mybatis.model.RoleWithUserCount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {

  RoleVm roleToResponseModel(Role role);
//  List<RoleVm> roleToResponseModel(List<Role> roles);
}
