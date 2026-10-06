package com.unipost.repository.jpa;

import java.util.List;

import com.unipost.domain.resource.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long>{
  public List<Resource> findAllByCategory(String category);
}
