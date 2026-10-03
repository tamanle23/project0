package com.project0.identity.app.user.command;

import com.project0.core.mediator.CommandHandler;
import com.project0.identity.domain.user.repository.UserRepository;
import com.project0.user.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegisterUserCommandHandler implements CommandHandler<RegisterUserCommand, Long> {

    private final UserRepository userRepository;

    public RegisterUserCommandHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Long handle(RegisterUserCommand command) {
        if (userRepository.existsByUserName(command.userName())) {
            throw new IllegalArgumentException("Username already taken.");
        }
        if (userRepository.existsByEmail(command.email())) {
            throw new IllegalArgumentException("Email already taken.");
        }

        User user = new User();
        user.setUserName(command.userName());
        user.setEmail(command.email());
        user.setPassword(command.password()); // In real app, password should be hashed.

        user = userRepository.save(user);

        return user.getId();
    }
}
