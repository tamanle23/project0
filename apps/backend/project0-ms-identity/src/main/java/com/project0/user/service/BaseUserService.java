package com.project0.user.service;

import com.project0.service.BaseModelService;
import com.project0.user.model.User;
import com.project0.user.repository.jpa.UserRepository;

public abstract class BaseUserService extends BaseModelService<User, UserRepository> implements UserService<User> {



  public BaseUserService() {
    entityClass = User.class;
  }


}
