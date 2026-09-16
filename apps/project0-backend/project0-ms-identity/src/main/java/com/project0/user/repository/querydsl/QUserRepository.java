package com.project0.user.repository.querydsl;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.project0.user.controller.request.PermissionVm;
import com.project0.user.controller.request.RoleVm;
import com.project0.user.controller.response.UserPermissionVm;
import org.springframework.stereotype.Component;

import com.project0.repository.queryDsl.BaseQRepository;
import com.project0.user.controller.request.UserRoleVm;
import com.project0.user.model.QRole;
import com.project0.user.model.QRolePermission;
import com.project0.user.model.QUserPermission;
import com.project0.user.model.QUserRole;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.Projections;

@Component
public class QUserRepository extends BaseQRepository{

  public List<UserPermissionVm> findAllUserPermissions(String uid) {
    QUserPermission qUserPermission = QUserPermission.userPermission;
    com.project0.user.model.QPermission qPermission = com.project0.user.model.QPermission.permission;
    com.project0.user.model.QUser qUser = com.project0.user.model.QUser.user;
//    Expression<Byte> enabledExpression = new CaseBuilder()
//        .when(qUserPermission.status.isNotNull().and(qUserPermission.status.eq((byte) 1))).then((byte) 1)
//        .when(qUserPermission.status.isNotNull().and(qUserPermission.status.eq((byte) 2))).then((byte) -1)
//        .otherwise((byte) 0).byteValue().as("status");
    return queryFactory.from(qUserPermission)
                       .innerJoin(qUserPermission.user,qUser)
                       .on(qUser.deletedDate.isNull().and(qUser.uid.eq(uid)))
                       .rightJoin(qUserPermission.permission,qPermission)
                       .on(qUserPermission.deletedDate.isNull())
                       .where(qUserPermission.deletedDate.isNull())
                       .orderBy(QUserPermission.userPermission.lastUpdatedDate.desc())
                       .select(Projections.fields(UserPermissionVm.class
                                                       , qUserPermission.id
                                                       , qUserPermission.version
                                                       , qUserPermission.lastUpdatedDate
                                                       , qUserPermission.status
                                                       , Projections.bean(PermissionVm.class
                                                                         ,qPermission.uid
                                                                         ,qPermission.code
                                                                         ,qPermission.description
                                                                         ,qPermission.version
                                                                         ,qPermission.type
                                                                         ,qPermission.lastUpdatedDate
                                                                         ,qPermission.id).as("permission")

                                                       ))
                       .fetch();
  }

  public List<UserRoleVm> findAllUserRoles(String uid) {
    QUserRole qUserRole = QUserRole.userRole;
    com.project0.user.model.QUser qUser = com.project0.user.model.QUser.user;
    QRole qRole = QRole.role;
    return queryFactory.from(qUserRole)
                       .innerJoin(qUserRole.user,qUser)
                       .on(qUser.deletedDate.isNull().and(qUser.uid.eq(uid)))
                       .rightJoin(qUserRole.role,qRole)
                       .on(qUserRole.deletedDate.isNull())
                       .where(qUserRole.deletedDate.isNull())
                       .select(Projections.fields(UserRoleVm.class
                                                       , qUserRole.id
                                                       , qUserRole.version
                                                       , Projections.bean(RoleVm.class
                                                                         ,qRole.uid
                                                                         ,qRole.code
                                                                         ,qRole.description
                                                                         ,qRole.version
                                                                         ,qRole.id).as("role")
                                                       ,qUserRole.user.isNotNull().as("enabled")))
                       .fetch();
  }

  public Map<String,Set<String>> findAllRoleGroupByPermission(Set<Long> roleIds) {
    QRolePermission qRolePermission = QRolePermission.rolePermission;

    return queryFactory.from(qRolePermission)
                       .innerJoin(qRolePermission.role, QRole.role)
                       .on(qRolePermission.role.uid.eq(QRole.role.uid))
                       .where(qRolePermission.deletedDate.isNull().and(qRolePermission.role.id.in(roleIds)))
                       .select(qRolePermission.permission.uid,qRolePermission.role.code)
                       .transform(
                           GroupBy.groupBy(qRolePermission.permission.uid)
                                  .as(GroupBy.set(qRolePermission.role.code))
                       );
  }

  public Map<String, String> findUsersName(List<String> userUids) {
    return queryFactory.from(com.project0.user.model.QUser.user)
                       .where(com.project0.user.model.QUser.user.uid.in(userUids))
                       .select(com.project0.user.model.QUser.user.uid, com.project0.user.model.QUser.user.userName)
                       .transform(GroupBy.groupBy(com.project0.user.model.QUser.user.uid).as(com.project0.user.model.QUser.user.userName));
  }
}
