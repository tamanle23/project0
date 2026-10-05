package com.project0.domain.metadata;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import com.project0.domain.BaseModel;

@Getter
@Setter
@Entity
@Table(name = "PROJECT0_RELATIONSHIP_TYPES")
public class RelationshipType extends BaseModel {

    @Column(name = "system_name", nullable = false, unique = true)
    private String systemName;

    @Column(columnDefinition = "TEXT")
    private String description;
}
