package com.project0.identity.domain.user.repository;

import com.project0.user.model.User;
import com.project0.user.model.enums.UserStatus;
import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    Optional<User> findByUserName(String userName);
    boolean existsByEmail(String email);
    boolean existsByUserName(String userName);
    void updateStatus(String userName, UserStatus status);
}
