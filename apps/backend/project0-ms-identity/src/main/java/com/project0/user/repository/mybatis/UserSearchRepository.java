package com.project0.user.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project0.core.io.PageRequest;
import com.project0.user.model.User;

@Mapper
public interface UserSearchRepository {
  public Long count();
  public List<User> findBy(@Param("pageRequest") PageRequest pageRequest);
}
