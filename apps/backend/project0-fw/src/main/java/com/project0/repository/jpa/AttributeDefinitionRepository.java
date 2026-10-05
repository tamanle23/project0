package com.project0.repository.jpa;

import com.project0.domain.metadata.AttributeDefinition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttributeDefinitionRepository extends BaseRepository<AttributeDefinition> {
    Page<AttributeDefinition> findByEntityTypeId(Long entityTypeId, Pageable pageable);
    List<AttributeDefinition> findByEntityTypeId(Long entityTypeId);
}
