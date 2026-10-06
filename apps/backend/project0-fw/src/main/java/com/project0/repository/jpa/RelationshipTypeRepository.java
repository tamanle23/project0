package com.project0.repository.jpa;

import com.project0.domain.metadata.RelationshipType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RelationshipTypeRepository extends BaseRepository<RelationshipType> {
    Optional<RelationshipType> findByIdAndDeletedDateIsNull(Long id);
    boolean existsBySystemNameAndDeletedDateIsNull(String systemName);
    Page<RelationshipType> findAllByDeletedDateIsNull(Pageable pageable);
}
