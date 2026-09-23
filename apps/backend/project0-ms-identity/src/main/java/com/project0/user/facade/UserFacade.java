package com.project0.user.facade;

import com.project0.user.controller.request.UserVm;

public interface UserFacade {
  UserVm findUserWithPermissions(String uid);
}
