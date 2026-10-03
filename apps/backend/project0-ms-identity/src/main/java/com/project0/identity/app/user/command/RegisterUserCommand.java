package com.project0.identity.app.user.command;

import com.project0.core.mediator.Command;

public record RegisterUserCommand(String userName, String email, String password) implements Command<Long> {}
