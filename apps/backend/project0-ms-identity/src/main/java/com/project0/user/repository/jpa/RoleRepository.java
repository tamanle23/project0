package com.project0.user.repository.jpa;

import com.project0.repository.jpa.NamedModelBaseRepository;
import com.project0.user.model.Role;

public interface RoleRepository extends NamedModelBaseRepository<Role> {

  public Role findOneByCodeIgnoreCase(String string);

}
