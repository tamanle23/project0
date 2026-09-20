package com.project0.domain.shopping;

import java.util.List;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import com.project0.domain.NamedModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@Table(name="product")
@Entity
public class Product extends NamedModel {

  private static final long serialVersionUID = -4299320361252327889L;

  private String thumbnail;

  @ElementCollection
  @CollectionTable(
        name="product_photo",
        joinColumns=@JoinColumn(name="owner_id")
  )
  @Column(name="photo_path")
  private List<String> photos;

  @ElementCollection
  @CollectionTable(
        name="product_tag",
        joinColumns=@JoinColumn(name="owner_id")
  )
  @Column(name="tag")
  private Set<String> tags;
}
