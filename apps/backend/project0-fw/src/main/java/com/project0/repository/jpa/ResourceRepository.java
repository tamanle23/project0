package com.project0.repository.jpa;

import java.util.List;

import com.project0.domain.resource.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long>{
  public List<Resource> findAllByCategory(String category);
}
