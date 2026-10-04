package com.project0.identity.app.user.command;

import com.project0.core.mediator.Command;
import com.project0.user.model.enums.UserStatus;

public record ChangeUserStatusCommand(String userName, UserStatus status) implements Command<Void> {}
