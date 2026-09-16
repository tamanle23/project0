package com.project0.fw;

import com.project0.core.constant.PermissionConstants;
import com.project0.core.exception.ErrorCodes;
import com.project0.core.io.ContextHeader;
import com.project0.domain.BaseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.project0.core.io.ResponseWrapper;
import com.project0.service.CrudService;
import com.project0.core.io.Error;

import java.util.List;
import java.util.Set;

public abstract class CommandController<T extends BaseModel, V> extends ApplicationResourceController {

  @Autowired
  protected CrudService<T> dataService;

  @DeleteMapping(value = "/{id}")
  @PreAuthorize(value = "hasPermission(this.getResourceName(), '"+ PermissionConstants.DELETE + "')")
  public ResponseWrapper<ContextHeader, T> delete(@PathVariable("id") Long id){
    if(dataService.deleteById(id)) {
      return success();
    }
    return error(Error.builder().errorCodes(ErrorCodes.ERROR_NOT_DELETABLE).build());
  }

  @DeleteMapping(value = "/{uid}/_uid")
  @PreAuthorize(value = "hasPermission(this.getResourceName(), '"+ PermissionConstants.DELETE + "')")
  public ResponseWrapper<ContextHeader, V> deleteByUid(@PathVariable("uid") String uid) {
    if(dataService.deleteByUid(uid)) {
      return success();
    }
    return error(Error.builder().errorCodes(ErrorCodes.ERROR_NOT_DELETABLE).build());
  };

  @DeleteMapping(value = "/{uid}/_uids")
  @PreAuthorize(value = "hasPermission(this.getResourceName(), '"+ PermissionConstants.DELETE + "')")
  public ResponseWrapper<ContextHeader, V> deleteByUids(@PathVariable("uid") Set<String> uids) {
    dataService.deleteByUids(uids);
    return success();
  };

  @PostMapping
  @PreAuthorize(value = "hasPermission(this.getResourceName(), '"+ PermissionConstants.CREATION + "')")
  public ResponseWrapper<ContextHeader, V> create(@RequestBody V viewModel) { return null;};

  @PostMapping(value="/_multi")
  @PreAuthorize(value = "hasPermission(this.getResourceName(), '"+ PermissionConstants.CREATION + "')")
  public ResponseWrapper<ContextHeader, List<V>> create(@RequestBody List<V> viewModel) { return null;};

  @PutMapping(value = "/{id}")
  @PreAuthorize(value = "hasPermission(this.getResourceName(), '"+ PermissionConstants.MODIFY + "')")
  public ResponseWrapper<ContextHeader, V> update(@PathVariable("id") Long id, @RequestBody V viewModel) { return null;};

  @PutMapping(value = "/{uid}/_uid")
  @PreAuthorize(value = "hasPermission(this.getResourceName(), '"+ PermissionConstants.MODIFY + "')")
  public ResponseWrapper<ContextHeader, V> updateByUid(@PathVariable("uid") String uid, @RequestBody V viewModel) { return null;};

  @PostMapping(value="/{uid}/_uid/copy")
  @PreAuthorize(value = "hasPermission(this.getResourceName(), '"+ PermissionConstants.COPY + "')")
  public ResponseWrapper<ContextHeader, V> copy(@RequestBody V viewModel) { return null;};

}
