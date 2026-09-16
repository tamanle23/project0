package com.project0.user.repository.querydsl;

import java.util.List;

import com.project0.user.controller.request.RoleVm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project0.core.io.PageRequest;
import com.project0.user.controller.request.RolePermissionVm;
import com.project0.user.controller.request.UserRoleVm;
import com.project0.user.model.Permission;
import com.project0.user.model.QPermission;
import com.project0.user.model.QRolePermission;
import com.project0.user.model.QUser;
import com.project0.user.model.QUserRole;
import com.project0.user.model.Role;
import com.project0.user.model.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Component
public class QRoleRepository {

  @Autowired
  JPAQueryFactory queryFactory;

  public List<RoleVm> findAllRolesWithUserCount(PageRequest pageable) {
    QUserRole qUserRole = QUserRole.userRole;
    com.project0.user.model.QRole qRole = com.project0.user.model.QRole.role;
    return queryFactory.from(qUserRole)
                       .rightJoin(qUserRole.role,qRole)
                       .groupBy(qRole)
                       .select(Projections.fields(RoleVm.class
                                                       ,qRole.code
                                                       ,qRole.description
                                                       ,qRole.version
                                                       ,qRole.id
                                                       ,qRole.uid
                                                       ,qUserRole.count().as("numberOfUsers")))
                       .offset(pageable.getNumber() * pageable.getSize())
                       .limit(pageable.getSize())
                       .fetch();
  }



  public List<RolePermissionVm> findAllRolePermissions(String uid) {
    QRolePermission qRolePermission = QRolePermission.rolePermission;
    QPermission qPermission = QPermission.permission;
    com.project0.user.model.QRole qRole = com.project0.user.model.QRole.role;
    return queryFactory.from(qRolePermission)
                       .innerJoin(qRolePermission.role,qRole)
                       .on(qRole.deletedDate.isNull().and(qRole.uid.eq(uid)))
                       .rightJoin(qRolePermission.permission,qPermission)
                       .on(qRolePermission.deletedDate.isNull())
                       .where(qRolePermission.deletedDate.isNull())
                       .select(Projections.fields(RolePermissionVm.class
                                                       , qRolePermission.id
                                                       , qRolePermission.version
                                                       , Projections.bean(Permission.class
                                                                         ,qPermission.uid
                                                                         ,qPermission.code
                                                                         ,qPermission.description
                                                                         ,qPermission.version
                                                                         ,qPermission.id).as(qRolePermission.permission)
                                                       ,qRolePermission.role.isNotNull().as("enabled")))
//                       .offset(pageable.getPageNumber() * pageable.getPageSize())
//                       .limit(pageable.getPageSize())
                       .fetch();
  }

  public List<UserRoleVm> findAllRoleUsers(String uid) {
    QUserRole qUserRole = QUserRole.userRole;
    QUser qUser = QUser.user;
    com.project0.user.model.QRole qRole = com.project0.user.model.QRole.role;
    return queryFactory.from(qUserRole)
                       .innerJoin(qUserRole.role,qRole)
                       .on(qRole.deletedDate.isNull().and(qRole.uid.eq(uid)))
                       .rightJoin(qUserRole.user,qUser)
                       .on(qUserRole.deletedDate.isNull())
                       .where(qUserRole.deletedDate.isNull())
                       .select(Projections.fields(UserRoleVm.class
                                                       , qUserRole.id
                                                       , qUserRole.version
                                                       , Projections.bean(User.class
                                                                         ,qUser.uid
                                                                         ,qUser.userName
                                                                         ,qUser.version
                                                                         ,qUser.id).as(qUserRole.user)
                                                       , qUserRole.role.isNotNull().as("enabled")))
//                       .offset(pageable.getPageNumber() * pageable.getPageSize())
//                       .limit(pageable.getPageSize())
                       .fetch();
  }

}
