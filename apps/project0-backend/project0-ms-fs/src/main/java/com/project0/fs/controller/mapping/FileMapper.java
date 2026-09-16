package com.project0.fs.controller.mapping;

import com.project0.fs.model.FsObject;
import org.mapstruct.Mapper;

import com.project0.fs.controller.response.FileVm;

@Mapper
public interface FileMapper {

  FileVm fileToFileVM(FsObject fsObject);
}
