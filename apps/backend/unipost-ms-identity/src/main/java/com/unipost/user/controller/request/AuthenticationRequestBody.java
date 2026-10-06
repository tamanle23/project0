package com.unipost.user.controller.request;

import com.unipost.user.model.enums.ClientType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequestBody {

  String userName;
  String password;
  ClientType clientType;
}
