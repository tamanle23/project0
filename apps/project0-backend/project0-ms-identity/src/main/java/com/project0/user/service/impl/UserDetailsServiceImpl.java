package com.project0.user.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.project0.user.model.User;
import com.project0.user.service.UserService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

  @Autowired
  UserService<User> userService;

  @Override
  public UserDetails loadUserByUsername(String username) {
    return userService.loadUserByUserName(username);
  }
}