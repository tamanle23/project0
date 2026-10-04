package com.project0.domain.metadata;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PROJECT0_RELATIONSHIP_TYPES")
@Getter
@Setter
public class RelationshipType {

    @Id
    @Column(length = 50, nullable = false)
    private String id;

    @Column(columnDefinition = "TEXT")
    private String description;

}
