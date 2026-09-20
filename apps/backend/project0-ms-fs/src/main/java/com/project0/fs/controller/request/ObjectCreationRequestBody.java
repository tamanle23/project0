package com.project0.fs.controller.request;

import com.project0.fs.model.FsObject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ObjectCreationRequestBody {
  FsObject object;
  String parentUid;
}
