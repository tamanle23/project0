package com.project0.repository.jpa;

import com.project0.domain.metadata.EntityRecord;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EntityRecordRepository extends BaseRepository<EntityRecord> {
    List<EntityRecord> findByEntityTypeId(Long entityTypeId);
}
