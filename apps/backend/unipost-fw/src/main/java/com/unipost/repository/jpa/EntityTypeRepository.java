package com.unipost.repository.jpa;

import com.unipost.domain.metadata.EntityType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EntityTypeRepository extends BaseRepository<EntityType> {
    Optional<EntityType> findByIdAndDeletedDateIsNull(Long id);
    boolean existsBySystemNameAndDeletedDateIsNull(String systemName);
    Page<EntityType> findAllByDeletedDateIsNull(Pageable pageable);
    long countByDeletedDateIsNull();
    java.util.List<EntityType> findByTenantIdAndDeletedDateIsNull(String tenantId);
    long countByTenantIdAndDeletedDateIsNull(String tenantId);
}
