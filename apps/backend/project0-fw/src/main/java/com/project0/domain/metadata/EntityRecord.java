package com.project0.domain.metadata;

import com.project0.domain.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import java.util.Map;

@Entity
@Table(name = "PROJECT0_ENTITIES")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
public class EntityRecord extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "entity_type_id", nullable = false)
    private EntityType entityType;

    @Convert(converter = MapJsonConverter.class)
    @Column(columnDefinition = "TEXT")
    private Map<String, Object> attributes;

}
