package com.project0.identity.app.user.query;

import com.project0.core.mediator.QueryHandler;
import com.project0.identity.domain.user.repository.UserRepository;
import com.project0.user.controller.response.UserResponseModel;
import com.project0.user.model.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetUserByUserNameQueryHandler implements QueryHandler<GetUserByUserNameQuery, UserResponseModel> {

    private final UserRepository userRepository;

    public GetUserByUserNameQueryHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponseModel handle(GetUserByUserNameQuery query) {
        Optional<User> userOpt = userRepository.findByUserName(query.userName());
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        User user = userOpt.get();
        UserResponseModel model = new UserResponseModel();
        model.setUserName(user.getUserName());
        model.setEmail(user.getEmail());
        model.setFirstName(user.getFirstName());
        model.setLastName(user.getLastName());
        return model;
    }
}
