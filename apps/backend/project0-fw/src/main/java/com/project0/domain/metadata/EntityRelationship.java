package com.project0.domain.metadata;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import com.project0.domain.BaseModel;
import jakarta.persistence.Convert;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "PROJECT0_ENTITY_RELATIONSHIPS")
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

    @Column(name = "edge_metadata", columnDefinition = "jsonb")
    @Convert(converter = MapJsonConverter.class)
    private Map<String, Object> edgeMetadata;
}
