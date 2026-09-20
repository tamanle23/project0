package com.project0.user.controller.request;

import com.project0.user.model.enums.ClientType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequestBody {

  String userName;
  String password;
  ClientType clientType;
}
