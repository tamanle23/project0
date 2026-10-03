package com.project0.identity.web.user.controller;

import com.project0.core.mediator.CommandDispatcher;
import com.project0.core.mediator.QueryDispatcher;
import com.project0.identity.app.user.command.RegisterUserCommand;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2/users")
public class UserCQRSController {

    private final CommandDispatcher commandDispatcher;
    private final QueryDispatcher queryDispatcher;

    public UserCQRSController(CommandDispatcher commandDispatcher, QueryDispatcher queryDispatcher) {
        this.commandDispatcher = commandDispatcher;
        this.queryDispatcher = queryDispatcher;
    }

    @PostMapping("/register")
    public ResponseEntity<Long> registerUser(@RequestBody RegisterUserRequest request) {
        var command = new RegisterUserCommand(request.userName(), request.email(), request.password());
        Long userId = commandDispatcher.dispatch(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(userId);
    }

    public record RegisterUserRequest(String userName, String email, String password) {}
}
