package com.project0.identity.domain.user.repository;

import com.project0.user.model.Permission;
import java.util.Optional;
import java.util.List;

public interface PermissionRepository {
    Permission save(Permission permission);
    Optional<Permission> findById(Long id);
    Optional<Permission> findByName(String name);
    List<Permission> findAll();
}
