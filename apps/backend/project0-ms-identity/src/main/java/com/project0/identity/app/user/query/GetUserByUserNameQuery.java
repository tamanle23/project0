package com.project0.identity.app.user.query;

import com.project0.core.mediator.Query;
import com.project0.user.controller.response.UserResponseModel;

public record GetUserByUserNameQuery(String userName) implements Query<UserResponseModel> {}
