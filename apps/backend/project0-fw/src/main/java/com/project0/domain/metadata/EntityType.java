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
@Table(name = "PROJECT0_ENTITY_TYPES")
public class EntityType extends BaseModel {

    @Column(nullable = false)
    private String name;

    @Column(name = "system_name", nullable = false)
    private String systemName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "schema_version", nullable = false)
    private Long schemaVersion = 1L;
}
