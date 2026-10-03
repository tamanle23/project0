package com.project0.identity.app.user.command;

import com.project0.core.mediator.CommandHandler;
import com.project0.identity.domain.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChangeUserStatusCommandHandler implements CommandHandler<ChangeUserStatusCommand, Void> {

    private final UserRepository userRepository;

    public ChangeUserStatusCommandHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Void handle(ChangeUserStatusCommand command) {
        userRepository.updateStatus(command.userName(), command.status());
        return null;
    }
}
