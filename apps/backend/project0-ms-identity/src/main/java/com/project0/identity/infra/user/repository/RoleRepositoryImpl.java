package com.project0.identity.infra.user.repository;

import com.project0.identity.domain.user.repository.RoleRepository;
import com.project0.user.model.Role;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository("domainRoleRepositoryImpl")
public class RoleRepositoryImpl implements RoleRepository {

    private final com.project0.identity.infra.user.repository.jpa.RoleRepository jpaRepository;

    public RoleRepositoryImpl(com.project0.identity.infra.user.repository.jpa.RoleRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Role save(Role role) {
        return jpaRepository.save(role);
    }

    @Override
    public Optional<Role> findById(Long id) {
        return jpaRepository.findById(id);
    }

    @Override
    public Optional<Role> findByName(String name) {
        return Optional.ofNullable(jpaRepository.findOneByCodeIgnoreCase(name));
    }

    @Override
    public boolean existsByName(String name) {
        return jpaRepository.findOneByCodeIgnoreCase(name) != null;
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }
}
