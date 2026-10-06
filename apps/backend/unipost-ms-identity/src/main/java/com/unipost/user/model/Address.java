package com.unipost.user.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import com.unipost.domain.BaseModel;
import com.unipost.user.Constants;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
@Table(name = Constants.TABLE_PREFIX + "address")
public class Address extends BaseModel {

  private static final long serialVersionUID = -4045660878510641848L;
  private String name;
  private String addressLine;
  private String city;
  private String countryState;
  private String country;
  private String zipCode;
  private boolean active;
}
