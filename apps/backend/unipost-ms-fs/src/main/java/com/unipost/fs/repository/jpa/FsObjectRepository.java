package com.unipost.fs.repository.jpa;

import java.util.List;

import com.unipost.fs.model.FsObject;
import com.unipost.repository.jpa.NamedModelBaseRepository;

public interface FsObjectRepository extends NamedModelBaseRepository<FsObject> {

  List<FsObject> findAllByIsDirectoryTrueAndParent_ParentIdNullAndOwnerUidAndDeletedDateIsNull(String uid);

  FsObject findOneByUidAndOwnerUid(String uid, String owner);
}
