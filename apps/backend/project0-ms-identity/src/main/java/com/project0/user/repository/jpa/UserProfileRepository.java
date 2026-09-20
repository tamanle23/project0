package com.project0.user.repository.jpa;

import com.project0.repository.jpa.BaseRepository;
import com.project0.user.model.UserProfile;

public interface UserProfileRepository extends BaseRepository<UserProfile> {

  UserProfile findOneByParent_Uid(String uid);

}
