package com.unipost.identity.infra.user.repository.jpa;

import com.unipost.repository.jpa.BaseRepository;
import com.unipost.user.model.UserProfile;

public interface UserProfileRepository extends BaseRepository<UserProfile> {

  UserProfile findOneByParent_Uid(String uid);

}
