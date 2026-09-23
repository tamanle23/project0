package com.project0.fw;

import com.project0.core.constant.PermissionActionConstants;
import com.project0.core.io.Page;
import com.project0.core.io.SearchCondition;
import com.project0.domain.BaseModel;
import com.project0.fw.controller.resolver.JsonParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.project0.core.io.ContextHeader;
import com.project0.core.io.ResponseWrapper;
import com.project0.service.CrudService;

public abstract class QueryController<T extends BaseModel, V, S extends SearchCondition> extends ApplicationResourceController {

  @Autowired
  protected CrudService<T> dataService;

  @GetMapping(value = "/{id}")
  @ResponseBody
  @PreAuthorize(value = "hasAuthority(this.getResourceName()_"+ PermissionActionConstants.LIST + "')")
  public ResponseWrapper<ContextHeader, V> get(@PathVariable Long id) { return null;}

  @GetMapping(value = "/{uid}/_uid")
  @ResponseBody
  @PreAuthorize(value = "hasAuthority(this.getResourceName()_"+ PermissionActionConstants.LIST + "')")
  public ResponseWrapper<ContextHeader, V> getByUid(@PathVariable String uid) { return null;}

  @GetMapping(value="/_list")
  @PreAuthorize(value = "hasAuthority(this.getResourceName()_"+ PermissionActionConstants.LIST + "')")
  public ResponseWrapper<ContextHeader, Page<V>> getSearch(@JsonParam("request") S searchRequest) {
    return null;
  }

  @PostMapping(value="/_list")
  @PreAuthorize(value = "hasAuthority(this.getResourceName()_"+ PermissionActionConstants.LIST + "')")
  public ResponseWrapper<ContextHeader, Page<V>> postSearch(@RequestBody S searchRequest){
    return null;
  }

  @GetMapping(value="/_export")
  @PreAuthorize(value = "hasPermission(this.getResourceName(), '"+ PermissionActionConstants.LIST + "')")
  public ResponseEntity<Resource> getExport(@JsonParam("request") S searchRequest) {
    return null;
  }
}
