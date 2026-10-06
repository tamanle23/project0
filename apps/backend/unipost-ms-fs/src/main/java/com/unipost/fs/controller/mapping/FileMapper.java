package com.unipost.fs.controller.mapping;

import com.unipost.fs.model.FsObject;
import org.mapstruct.Mapper;

import com.unipost.fs.controller.response.FileVm;

@Mapper
public interface FileMapper {

  FileVm fileToFileVM(FsObject fsObject);
}
