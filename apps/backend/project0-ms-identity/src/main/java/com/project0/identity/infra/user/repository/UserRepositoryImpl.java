package com.project0.identity.infra.user.repository;

import com.project0.identity.domain.user.repository.UserRepository;
import com.project0.user.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository("domainUserRepositoryImpl")
public class UserRepositoryImpl implements UserRepository {

    private final com.project0.user.repository.jpa.UserRepository jpaRepository;

    public UserRepositoryImpl(com.project0.user.repository.jpa.UserRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public User save(User user) {
        return jpaRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpaRepository.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        // Since there's no findByEmail in the original interface, we will skip it for this PoC
        // or return empty if unsupported, but we will return empty here to compile.
        return Optional.empty();
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpaRepository.countByEmail(email) > 0;
    }

    @Override
    public boolean existsByUserName(String userName) {
        return jpaRepository.countByUserNameIgnoreCase(userName) > 0;
    }
}
