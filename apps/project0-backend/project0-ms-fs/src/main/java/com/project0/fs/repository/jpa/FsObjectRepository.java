package com.project0.fs.repository.jpa;

import java.util.List;

import com.project0.fs.model.FsObject;
import com.project0.repository.jpa.NamedModelBaseRepository;

public interface FsObjectRepository extends NamedModelBaseRepository<FsObject> {

  List<FsObject> findAllByIsDirectoryTrueAndParent_ParentIdNullAndOwnerUidAndDeletedDateIsNull(String uid);

  FsObject findOneByUidAndOwnerUid(String uid, String owner);
}
