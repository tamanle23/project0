package com.project0.repository.jpa;

import com.project0.domain.metadata.EntityType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EntityTypeRepository extends BaseRepository<EntityType> {
    Optional<EntityType> findByIdAndDeletedDateIsNull(Long id);
    boolean existsBySystemNameAndDeletedDateIsNull(String systemName);
    Page<EntityType> findAllByDeletedDateIsNull(Pageable pageable);
}
