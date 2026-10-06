package com.project0.repository.jpa;

import com.project0.domain.metadata.EntityRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EntityRecordRepository extends BaseRepository<EntityRecord> {
    Page<EntityRecord> findByEntityTypeId(Long entityTypeId, Pageable pageable);
    List<EntityRecord> findByEntityTypeId(Long entityTypeId);
    Page<EntityRecord> findByEntityTypeIdAndDeletedDateIsNull(Long entityTypeId, Pageable pageable);
    List<EntityRecord> findByEntityTypeIdAndDeletedDateIsNull(Long entityTypeId);
    Optional<EntityRecord> findByIdAndDeletedDateIsNull(Long id);
    Optional<EntityRecord> findByEntityTypeIdAndIdAndDeletedDateIsNull(Long entityTypeId, Long id);
    boolean existsByEntityTypeIdAndDeletedDateIsNull(Long entityTypeId);
}
