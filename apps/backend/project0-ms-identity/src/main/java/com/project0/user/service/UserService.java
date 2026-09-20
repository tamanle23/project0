package com.project0.user.service;

import java.util.List;
import java.util.Map;

import com.project0.core.io.ContextHeader;
import com.project0.core.io.Page;
import com.project0.core.io.RequestWrapper;
import com.project0.user.controller.request.*;
import com.project0.user.controller.response.UserPermissionVm;
import com.project0.user.model.enums.UserStatus;
import com.project0.user.model.enums.UserType;
import com.project0.service.CrudService;
import com.project0.service.authentication.UserDetailsImpl;
import com.project0.user.model.AuthenticationType;
import com.project0.user.model.PasswordResetToken;
import com.project0.user.model.RegistrationToken;
import com.project0.user.model.User;
import com.project0.user.model.UserProfile;

public interface UserService<T extends User> extends CrudService<T>{

  public T findByIdAndUserType(Long accountId, UserType accountType);
  public T findByUserName(String userName);
  public void approveUser(T account,UserStatus status);
  public void registerAuthenticationActivity(T account, AuthenticationType loginsuccess,String userAgent);
  public void enableUser(String userName);
  public void disableUser(String userName);
  public UserDetailsImpl loadUserByUserName(String username);
  public UserDetailsImpl loadUserById(Long id);
  public UserVm findUserWithPermissions(String uid);
//  public Page<T> findAllByCriteria(Specification<T> criteria, Pageable pageable);
//  public Page<T> findAll(Pageable pageable);
//  public Page<T> findAll(PageRequest pageable);
  public List<T> findAll();
  public Page<User> findBy(RequestWrapper<ContextHeader, UserSearchCondition> request);

  public User getUserByRegistrationToken(String registrationToken);
  public void createRegistrationToken(User user, String token);
  public RegistrationToken getRegistrationToken(String registrationToken);
  public RegistrationToken generateRegistrationToken(String token);
  public void createPasswordResetToken(User user, String token);
  public PasswordResetToken getPasswordResetToken(String token);
  public User getUserByPasswordResetToken(String token);
  public void changeUserPassword(User user, String password);
  public boolean checkIfValidOldPassword(User user, String password);
  public String validateVerificationToken(String token);
  public String generateQRUrl(User user);
  public boolean validatePasswordResetToken(long id, String token);
  public void resetPassword(String newPassword, long id, String token);
  public Map<String, String> findUsersName(List<String> userUids);
  public UserProfile getUserProfile(String uid);
  public Page<RoleVm> findUserRoles(String uid, RequestWrapper<ContextHeader, UserRoleSearchCondition> request);
  public void updatePermissions(String uid, List<UserPermissionVm> userPermissions);
  public Page<PermissionVm> findUserPermissions(String uid, RequestWrapper<ContextHeader, UserPermissionSearchCondition> request);

}
