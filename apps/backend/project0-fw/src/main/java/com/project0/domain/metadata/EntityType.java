package com.project0.domain.metadata;

import com.project0.domain.BaseModel;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "PROJECT0_ENTITY_TYPES")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntityType extends BaseModel {

    private String name;

}
