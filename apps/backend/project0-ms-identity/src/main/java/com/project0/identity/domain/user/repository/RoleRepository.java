package com.project0.identity.domain.user.repository;

import com.project0.user.model.Role;
import java.util.Optional;

public interface RoleRepository {
    Role save(Role role);
    Optional<Role> findById(Long id);
    Optional<Role> findByName(String name);
    boolean existsByName(String name);
    void deleteById(Long id);
}
