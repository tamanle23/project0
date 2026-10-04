package com.project0.domain.metadata;

import com.project0.domain.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "PROJECT0_ENTITY_TYPES")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
public class EntityType extends BaseModel {

    @Column(length = 100, nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

}
