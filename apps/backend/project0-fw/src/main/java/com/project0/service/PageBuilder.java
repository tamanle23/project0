package com.project0.service;

import com.project0.core.io.Page;
import com.project0.core.io.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Supplier;

@Component
public class PageBuilder {

  public <T> Page<T> build(PageRequest pageRequest, Supplier<Long> totalSupplier, Supplier<List<T>> contentSupplier) {
    Long total = null;
    if(pageRequest.getNumber() !=null && pageRequest.getNumber().equals(1) && totalSupplier != null) {
      total = totalSupplier.get();
    }
    Page<T> page = Page.<T>builder()
                      .totalElements(total)
                      .content(contentSupplier.get())
                      .build();
    page.setNumber(pageRequest.getNumber());
    if(total != null) {
      page.setTotalPages((page.getTotalElements() / pageRequest.getSize()) + 1);
    }
    page.setSize(pageRequest.getSize());
    page.setLastOffset(pageRequest.getOffset() + page.getContent().size() - 1);
    return page;
  }
}
