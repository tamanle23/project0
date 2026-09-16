package com.project0.fs.service;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;

import com.project0.core.io.ContextHeader;
import com.project0.core.io.RequestWrapper;
import com.project0.fs.controller.request.ObjectCreationRequestBody;
import com.project0.fs.controller.request.FileDropRequestBody;
import com.project0.fs.controller.request.FileRemovalRequestBody;
import com.project0.fs.model.FsObject;
import com.project0.service.CrudService;

public interface FileService extends CrudService<FsObject>{

  List<FsObject> findAllByParentUid(String uid);

  FsObject register(RequestWrapper<ContextHeader, ObjectCreationRequestBody> request);

  FsObject register(FsObject fsObject, String parentUid, boolean isOverwrite);

  List<FsObject> register(List<FsObject> fsObjects, String parentUid, boolean isOverwrite);

  List<FsObject> register(List<FsObject> fsObjects, String parentUid);

  List<FsObject> findAllDirectories(String uid);

  List<FsObject> findAllFilesByParentUid(String uid);

  List<FsObject> processUploadFile(HttpServletRequest request, String uid, String overwrite);

  void deleteByUids(RequestWrapper<ContextHeader, FileRemovalRequestBody> extractRequest);

  void dropFiles(RequestWrapper<ContextHeader, FileDropRequestBody> extractRequest);
}
