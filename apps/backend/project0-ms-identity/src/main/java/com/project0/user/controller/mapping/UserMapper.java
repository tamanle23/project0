package com.project0.user.controller.mapping;

import java.util.List;

import com.project0.user.controller.request.RoleVm;
import com.project0.user.controller.request.UserVm;
import org.mapstruct.Mapper;

import com.project0.core.io.Page;
import com.project0.user.controller.response.UserProfileVm;
import com.project0.user.model.User;
import com.project0.user.model.UserProfile;
import com.project0.user.repository.mybatis.model.RoleWithUserCount;

@Mapper
public interface UserMapper {

  Page<UserVm> pageToResponsePage(Page<User> page);
//  RoleVm roleToResponseModel(CompositeRole role);
  RoleVm roleToResponseModel(RoleWithUserCount role);
  Page<RoleVm> roleToResponseModel(Page<RoleWithUserCount> roles);
//  List<RoleVm> roleToResponseModel(List<CompositeRole> roles);
  UserVm userToResponseModel(User user);
  List<UserVm> userToResponseModel(List<User> users);
  UserProfileVm userProfileToResponseBody(UserProfile profile);
}
