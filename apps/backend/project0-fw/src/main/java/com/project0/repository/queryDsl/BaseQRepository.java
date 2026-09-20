package com.project0.repository.queryDsl;

import org.springframework.beans.factory.annotation.Autowired;

import com.querydsl.jpa.impl.JPAQueryFactory;

public abstract class BaseQRepository {
  @Autowired
  protected JPAQueryFactory queryFactory;
}
