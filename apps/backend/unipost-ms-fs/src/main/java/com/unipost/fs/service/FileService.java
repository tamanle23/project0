package com.unipost.fs.service;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;

import com.unipost.core.io.ContextHeader;
import com.unipost.core.io.RequestWrapper;
import com.unipost.fs.controller.request.ObjectCreationRequestBody;
import com.unipost.fs.controller.request.FileDropRequestBody;
import com.unipost.fs.controller.request.FileRemovalRequestBody;
import com.unipost.fs.model.FsObject;
import com.unipost.service.CrudService;

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
