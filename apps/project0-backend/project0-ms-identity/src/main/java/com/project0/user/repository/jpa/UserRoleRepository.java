package com.project0.user.repository.jpa;

import java.util.List;

import com.project0.repository.jpa.BaseRepository;
import com.project0.user.model.User;
import com.project0.user.model.UserRole;

public interface UserRoleRepository extends BaseRepository<UserRole>{

  List<UserRole> findAllByUser(User userUser);
}
