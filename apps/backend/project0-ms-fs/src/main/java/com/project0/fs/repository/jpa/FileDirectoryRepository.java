package com.project0.fs.repository.jpa;

import java.util.List;

import com.project0.fs.model.FsObjecRelation;
import com.project0.fs.model.FsObject;
import com.project0.repository.jpa.BaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FileDirectoryRepository extends BaseRepository<FsObjecRelation>{
  List<FsObjecRelation> findAllByChildAndDeletedDateIsNull(FsObject fsObject);
  List<FsObjecRelation> findAllByParent(FsObject fsObject);
  Page<FsObjecRelation> findAllByParent(FsObject fsObject, Pageable pageable);
  List<FsObjecRelation> findAllByChild_IsDirectoryTrueAndChild_DeletedDateIsNullAndParent(FsObject fsObject);
  List<FsObjecRelation> findAllByChild_IsDirectoryTrueAndChild_DeletedDateIsNullAndParent_Uid(String uid);
  List<FsObjecRelation> findAllByChild_IsDirectoryFalseAndChild_DeletedDateIsNullAndParent(FsObject fsObject);
  Page<FsObjecRelation> findAllByChild_IsDirectoryFalseAndChild_DeletedDateIsNullAndParent(FsObject fsObject, Pageable pageable);
  Page<FsObjecRelation> findAllByChild_DeletedDateIsNullAndParent(FsObject fsObject, Pageable pageable);
  List<FsObjecRelation> findAllByChild_DeletedDateIsNullAndParentAndChild_OwnerUid(FsObject fsObject, String ownerUid);
  FsObjecRelation findFirstByChild_OwnerUidAndChild_NameAndChild_ExtensionAndParent_UidAndChild_DeletedDateIsNull(String ownerUid, String fileName, String extension, String parentUid);
  FsObjecRelation findFirstByChild_NameAndChild_ExtensionAndParent_UidIsNullAndDeletedDateIsNull(String fileName, String extension);
  List<FsObjecRelation> findAllByChild_UidIn(List<String> uids);
}
