package com.project0.fs.service.impl;

import com.project0.fs.controller.response.Link;
import com.project0.fs.service.FileService;
import com.project0.fs.service.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LinkServiceimpl implements LinkService {

  @Autowired
  FileService fileService;

  @Override
  public Link getLink(String uid) {
    Object fsObject = fileService.findByUid(uid);
    return null;
  }
}
