package com.project0.user.controller.request;

import com.project0.user.model.UserPermission;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
public class CompositeUserPermission extends UserPermission {

  Boolean enabled;
}
