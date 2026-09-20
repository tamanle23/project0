package com.project0.user.controller.mapping;

import com.project0.core.io.Page;
import com.project0.user.controller.request.RoleVm;
import com.project0.user.controller.request.UserVm;
import com.project0.user.controller.response.UserProfileVm;
import com.project0.user.model.Role;
import com.project0.user.model.User;
import com.project0.user.model.UserProfile;
import com.project0.user.repository.mybatis.model.RoleWithUserCount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {

  RoleVm roleToResponseModel(Role role);
//  List<RoleVm> roleToResponseModel(List<Role> roles);
}
