package com.project0.user.controller.request;

import com.project0.core.io.PageRequest;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSearchRequestBody {
  PageRequest pageRequest;
  UserSearchCondition searchCondition;
}
