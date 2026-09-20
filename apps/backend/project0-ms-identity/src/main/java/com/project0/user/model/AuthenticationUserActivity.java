package com.project0.user.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
@Entity
@DiscriminatorValue("AuthenticationUserActivity")
public class AuthenticationUserActivity extends UserActivity{

  @Enumerated(EnumType.STRING)
  private AuthenticationType authenticationType;
}
