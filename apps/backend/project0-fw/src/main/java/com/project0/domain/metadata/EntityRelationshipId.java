package com.project0.domain.metadata;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import lombok.EqualsAndHashCode;

@Getter
@Setter
@EqualsAndHashCode
public class EntityRelationshipId implements Serializable {
    private Long sourceEntity;
    private Long targetEntity;
    private String relationshipType;
}
