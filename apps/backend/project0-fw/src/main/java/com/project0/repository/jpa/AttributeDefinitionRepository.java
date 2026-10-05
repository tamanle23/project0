package com.project0.repository.jpa;

import com.project0.domain.metadata.AttributeDefinition;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AttributeDefinitionRepository extends BaseRepository<AttributeDefinition> {
    List<AttributeDefinition> findByEntityTypeId(Long entityTypeId);
}
