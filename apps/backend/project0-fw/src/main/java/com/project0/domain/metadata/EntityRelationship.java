package com.project0.domain.metadata;

import com.project0.domain.BaseModel;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "PROJECT0_ENTITY_RELATIONSHIPS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntityRelationship extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "source_entity_id", nullable = false)
    private EntityRecord sourceEntity;

    @ManyToOne
    @JoinColumn(name = "target_entity_id", nullable = false)
    private EntityRecord targetEntity;

    @ManyToOne
    @JoinColumn(name = "relationship_type_id", nullable = false)
    private RelationshipType relationshipType;

}
