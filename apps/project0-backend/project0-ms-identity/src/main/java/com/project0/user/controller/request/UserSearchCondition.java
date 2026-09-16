package com.project0.user.controller.request;

import java.util.List;

import com.project0.core.io.SearchCondition;
import com.project0.user.model.enums.UserType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearchCondition extends SearchCondition {
  private String userName;
  private List<UserType> userTypes;
}
