package com.project0.domain.metadata;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import com.project0.domain.BaseModel;
import org.hibernate.annotations.Type;
import jakarta.persistence.Convert;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "PROJECT0_ATTRIBUTE_DEFINITIONS")
public class AttributeDefinition extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "entity_type_id", nullable = false)
    private EntityType entityType;

    @Column(nullable = false)
    private String name;

    @Column(name = "system_name", nullable = false)
    private String systemName;

    @Column(name = "data_type", nullable = false)
    private String dataType;

    @Column(name = "ui_component", nullable = false)
    private String uiComponent;

    @Column(name = "is_required")
    private Boolean isRequired = false;

    @Column(name = "is_archived")
    private Boolean isArchived = false;

    @Column(columnDefinition = "jsonb")
    @Convert(converter = MapJsonConverter.class)
    private Map<String, Object> options;

    @Column(name = "default_value")
    private String defaultValue;
}
