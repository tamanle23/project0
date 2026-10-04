package com.project0.domain.metadata;

import com.project0.domain.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import java.util.Map;

@Entity
@Table(name = "PROJECT0_ATTRIBUTE_DEFINITIONS",
       uniqueConstraints = { @UniqueConstraint(columnNames = {"entity_type_id", "field_key"}) })
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
public class AttributeDefinition extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "entity_type_id", nullable = false)
    private EntityType entityType;

    @Column(name = "field_key", length = 50, nullable = false)
    private String fieldKey;

    @Column(name = "display_name", length = 100, nullable = false)
    private String displayName;

    @Column(name = "ui_component", length = 50, nullable = false)
    private String uiComponent;

    @Column(name = "data_type", length = 20, nullable = false)
    private String dataType;

    @Column(name = "is_required")
    private Boolean isRequired;

    @Convert(converter = MapJsonConverter.class)
    @Column(columnDefinition = "TEXT")
    private Map<String, Object> options;

}
