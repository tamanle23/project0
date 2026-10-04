package com.project0.domain.metadata;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.util.Map;

@Entity
@Table(name = "PROJECT0_ENTITY_RELATIONSHIPS")
@IdClass(EntityRelationshipId.class)
@Getter
@Setter
public class EntityRelationship {

    @Id
    @ManyToOne
    @JoinColumn(name = "source_entity_id", nullable = false)
    private EntityRecord sourceEntity;

    @Id
    @ManyToOne
    @JoinColumn(name = "target_entity_id", nullable = false)
    private EntityRecord targetEntity;

    @Id
    @ManyToOne
    @JoinColumn(name = "relationship_type_id", nullable = false)
    private RelationshipType relationshipType;

    @Convert(converter = MapJsonConverter.class)
    @Column(name = "edge_metadata", columnDefinition = "TEXT")
    private Map<String, Object> edgeMetadata;

}
