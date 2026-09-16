package com.project0.user.model;

import jakarta.persistence.*;

import com.project0.domain.NamedModel;
import com.project0.user.Constants;
import com.project0.user.model.enums.PermissionLevel;
import com.project0.user.model.enums.PermissionType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = Constants.TABLE_PREFIX + "permission")
public class Permission extends NamedModel {

  private static final long serialVersionUID = 4396393555601831943L;

  @Enumerated(EnumType.STRING)
  protected PermissionType type;

  @Enumerated(EnumType.STRING)
  protected PermissionLevel level;

  private String target;

  private String action;
}
