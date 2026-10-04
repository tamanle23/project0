package com.project0.domain.metadata;

import com.project0.domain.BaseModel;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Map;

@Entity
@Table(name = "PROJECT0_ENTITIES")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntityRecord extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "entity_type_id", nullable = false)
    private EntityType entityType;

    @Column(columnDefinition = "jsonb")
    @Convert(converter = MapJsonConverter.class)
    private Map<String, Object> attributes;

}
