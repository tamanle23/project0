package com.project0.user.service.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.*;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import com.google.common.base.Objects;
import com.project0.core.helper.GenerationHelper;
import com.project0.core.io.ContextHeader;
import com.project0.domain.NamedModel;
import com.project0.service.BaseModelService;
import com.project0.service.authentication.UserDetailsImpl;
import com.project0.user.controller.mapping.UserMapper;
import com.project0.user.controller.request.*;
import com.project0.user.controller.response.UserPermissionVm;
import com.project0.user.model.*;
import com.project0.user.model.enums.UserType;
import com.project0.user.repository.jpa.*;
import com.project0.user.repository.mybatis.UserSearchRepository;
import com.project0.workflow.RecordState;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project0.core.context.Context;
import com.project0.core.exception.BusinessException;
import com.project0.core.exception.ErrorCodes;
import com.project0.core.io.Page;
import com.project0.core.io.RequestWrapper;
import com.project0.user.model.enums.UserStatus;
import com.project0.repository.jpa.ProjectRepository;
import com.project0.user.service.UserService;
import org.springframework.validation.Errors;

@Transactional
@Service
public class UserServiceImpl extends BaseModelService<User, UserRepository> implements UserService<User> {

  Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

  public static final String TOKEN_INVALID = "invalidToken";
  public static final String TOKEN_EXPIRED = "expired";
  public static final String TOKEN_VALID = "valid";

  public static String QR_PREFIX = "https://chart.googleapis.com/chart?chs=200x200&chld=M%%7C0&cht=qr&chl=";
  public static String APP_NAME = "vPos";

  @Autowired
  com.project0.user.repository.mybatis.UserRepository mUserRepository;
  @Autowired
  Context contextHelper;
  @Autowired
  UserSearchRepository userSearchRepository;
  @Autowired
  private RegistrationTokenRepository tokenRepository;
  @Autowired
  private PasswordResetTokenRepository passwordTokenRepository;
  @Autowired
  UserPermissionRepository userPermissionRepository;
  @Autowired
  ProjectRepository projectRepository;
  @Autowired
  PermissionRepository permissionRepository;
  @Autowired
  UserMapper userMapper;
  @Inject
  protected com.project0.user.repository.jpa.UserRepository userRepository;
  @Inject
  protected RoleRepository roleRepository;
  @Inject
  protected PasswordEncoder passwordEncoder;
  @Autowired
  UserActivityRepository userActivityRepository;
  @Autowired
  UserRoleRepository userRoleRepository;
  @Autowired
  GenerationHelper generationHelper;

  @Override
  public UserVm findUserWithPermissions(String uid) {
    User user = this.repository.findOneByUid(uid);

    if(user == null) {
      throw BusinessException.create().add(ErrorCodes.ERROR_NOT_EXISTED);
    }
    UserVm qUser = this.userMapper.userToResponseModel(user);
    qUser.setUserPermissions(mUserRepository.findAllUserPermissions(uid));
    qUser.setUserRoles(mUserRepository.findAllUserRoles(uid));

    if(CollectionUtils.isNotEmpty(qUser.getUserRoles())
        && CollectionUtils.isNotEmpty(qUser.getUserPermissions())) {
      Set<Long> roleIds = qUser.getUserRoles()
                               .stream()
                               .filter(UserRoleVm::getEnabled)
                               .map(ar->ar.getRole().getId())
                               .collect(Collectors.toSet());
      Map<String, Set<String>> roleGroupByPermission = CollectionUtils.isEmpty(roleIds) ? Collections.emptyMap() :
          mUserRepository.findAllRoleGroupByPermission(roleIds)
                         .stream()
                         .collect(Collectors.groupingBy(
                             m -> (String) m.get("permissionUid"),
                             Collectors.mapping(m -> (String) m.get("roleCode"), Collectors.toSet())
                         ));
      qUser.getUserPermissions()
        .stream()
        .forEach(ap->ap.setInheritingRoles(roleGroupByPermission.get(ap.getPermission().getUid())));
    }
    return qUser;
  }

  @Override
  public User getUserByRegistrationToken(String registrationToken) {
    final RegistrationToken token = tokenRepository.findByToken(registrationToken);
    if (token != null) {
      return token.getUser();
    }
    return null;
  }

  @Override
  public void createRegistrationToken(User user, String token) {
    final RegistrationToken myToken = new RegistrationToken(token, user);
    tokenRepository.save(myToken);
  }

  @Override
  public RegistrationToken getRegistrationToken(String registrationToken) {
    return tokenRepository.findByToken(registrationToken);
  }

  @Override
  public RegistrationToken generateRegistrationToken(String token) {
    RegistrationToken vToken = tokenRepository.findByToken(token);
    vToken.updateToken(UUID.randomUUID().toString());
    vToken = tokenRepository.save(vToken);
    return vToken;
  }

  @Override
  public void createPasswordResetToken(User user, String token) {
    final PasswordResetToken myToken = new PasswordResetToken(token, user);
    passwordTokenRepository.save(myToken);
  }

  @Override
  public PasswordResetToken getPasswordResetToken(String token) {
    return passwordTokenRepository.findByToken(token);
  }

  @Override
  public User getUserByPasswordResetToken(String token) {
    return passwordTokenRepository.findByToken(token)
        .getUser();
  }

  @Override
  public void changeUserPassword(User user, String password) {
    user.setPassword(passwordEncoder.encode(password));
    userRepository.save(user);
  }

  @Override
  public boolean checkIfValidOldPassword(User user, String password) {
    return passwordEncoder.matches(password, user.getPassword());
  }

  @Override
  public String validateVerificationToken(String token) {
    final RegistrationToken verificationToken = tokenRepository.findByToken(token);
    if (verificationToken == null) {
      return TOKEN_INVALID;
    }

    final User user = verificationToken.getUser();
    final Calendar cal = Calendar.getInstance();
    if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
      tokenRepository.delete(verificationToken);
      return TOKEN_EXPIRED;
    }

    user.setStatus(UserStatus.ENABLED);
    // tokenRepository.delete(verificationToken);
    userRepository.save(user);
    return TOKEN_VALID;
  }

  @Override
  public String generateQRUrl(User user) {
    try {
      return QR_PREFIX + URLEncoder.encode(String.format("otpauth://totp/%s:%s?secret=%s&issuer=%s", APP_NAME, user.getEmail(), user.getUid(), APP_NAME), "UTF-8");
    } catch (UnsupportedEncodingException e) {
      throw BusinessException.create(e).add(ErrorCodes.ERROR);
    }
  }

  @Override
  public boolean validatePasswordResetToken(long id, String token) {
    final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);
    if ((passToken == null) || (passToken.getUser().getId() != id)) {
        return false;
    }

    final Calendar cal = Calendar.getInstance();
    if ((passToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
        return false;
    }

    final User user = passToken.getUser();
    final Authentication auth = new UsernamePasswordAuthenticationToken(user, null, Collections.singletonList(new SimpleGrantedAuthority("CHANGE_PASSWORD_PRIVILEGE")));
    SecurityContextHolder.getContext().setAuthentication(auth);
    return true;
  }

  @Override
  public void resetPassword(String newPassword, long id, String token) {
    if(this.validatePasswordResetToken(id, token)) {
      final User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      this.changeUserPassword(user,newPassword);
    }
  }

  @Override
  public Map<String, String> findUsersName(List<String> userUids) {
    if (CollectionUtils.isEmpty(userUids)) {
      return Collections.emptyMap();
    }
    List<Map<String, String>> list = this.mUserRepository.findUsersName(userUids);
    return list.stream().collect(Collectors.toMap(m -> m.get("uid"), m -> m.get("userName")));
  }

  @Override
  public UserProfile getUserProfile(String uid) {
    return null;
  }

  @Override
  public Page<PermissionVm> findUserPermissions(String uid, RequestWrapper<ContextHeader, UserPermissionSearchCondition> request) {
//    Page<CompositePermission> page = Page.<CompositePermission>builder()
//            .totalElements(roleMapper.count(searchRequest))
//            .content(roleMapper.findWithUserCount(searchRequest))
//            .build();
//    page.setNumber(searchRequest.getNumberRequest().getNumber());
//    page.setTotalPages((page.getTotalElements() / searchRequest.getNumberRequest().getSize()) + 1);
//    page.setSize(searchRequest.getNumberRequest().getSize());
//    return page;

    return null;
  }

  @Override
  public Page<RoleVm> findUserRoles(String uid, RequestWrapper<ContextHeader, UserRoleSearchCondition> request) {
      return null;
  }

  @Override
  public void updatePermissions(String uid, List<UserPermissionVm> cUserPermissions) {
    User user = userRepository.findOneByUid(uid);
    List<UserPermissionVm> newCUserPermissions = new ArrayList<>();
    List<UserPermissionVm> cUpdatedUserPermissions = new ArrayList<>();
    for(UserPermissionVm cUserPermission:cUserPermissions){
      if(cUserPermission.getStatus() != null){
        if(cUserPermission.getId() == null) {
          newCUserPermissions.add(cUserPermission);
        } else if(cUserPermission.getId()!=null) {
          cUpdatedUserPermissions.add(cUserPermission);
        }
      }
    }

    if(CollectionUtils.isNotEmpty(cUpdatedUserPermissions)) {
      List<UserPermission> userPermissions = userPermissionRepository.findAllByIdIn(cUpdatedUserPermissions.stream().map(UserPermissionVm::getId).collect(Collectors.toList()));
      userPermissions.forEach(up -> cUserPermissions.stream()
                                                .filter(p->p.getId().equals(up.getId()))
                                                .findFirst()
                                                .ifPresent(cup -> up.setStatus(cup.getStatus()))
      );
//      userPermissionRepository.deleteByIdIn(updatedUserPermissions.stream()
//                                                                   .map(CompositeUserPermission::getId)
//                                                                   .collect(Collectors.toList()));
      userPermissionRepository.saveAll(userPermissions);
    }
    if(CollectionUtils.isNotEmpty(newCUserPermissions)) {
      Map<Long,Permission> permissionMap = permissionRepository.findAllByIdIn(newCUserPermissions.stream()
                                                                                                .map(entity->entity.getPermission().getId())
                                                                                                .collect(Collectors.toList()))
                                                               .stream()
                                                               .collect(Collectors.toMap(Permission::getId,Function.identity()));
      List<UserPermission> permissions = newCUserPermissions.stream()
          .map(centity->UserPermission.builder()
              .permission(permissionMap.get(centity.getPermission().getId()))
              .user(user)
              .status(centity.getStatus())
              .build())
          .collect(Collectors.toList());
      userPermissionRepository.saveAll(permissions);
    }
  }

  @Override
  public Page<User> findBy(RequestWrapper<ContextHeader, UserSearchCondition> request) {
    Page<User> page = Page.<User>builder()
                          .totalElements(userSearchRepository.count())
                          .content(userSearchRepository.findBy(request.getBody().getPageRequest()))
                          .build();
    page.setNumber(request.getBody().getPageRequest().getNumber());
    page.setTotalPages((page.getTotalElements() / request.getBody().getPageRequest().getSize()) + 1);
    page.setSize(request.getBody().getPageRequest().getSize());
    return page;
  }

  @Override
  public User create(Supplier<User> userSupplier) {
    if(userSupplier != null) {
      User user = userSupplier.get();
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setNonExpired(true);
      user.setNonLocked(true);
      user.setCredentialsNonExpired(true);
      user.setStatus(UserStatus.ENABLED);
      return this.userRepository.save(user);
    }
    return null;
  }

  @Override
  public User modify(Long id, Consumer<User> updateMapping) {
    User existingUser = this.getRepository().getOne(id);
    updateMapping.accept(existingUser);
    return userRepository.save(existingUser);
  }

  @Override
  public void delete(User user) {
    User existingUser = this.checkExistence(user);
    switch (existingUser.getType()) {
      default:
        userRepository.deleteById(user.getId());
        break;
    }
    this.deleteById(user.getId());
  }

  @Override
  public User findByUserName(String userName) {
    User existingUser = (User) userRepository.findByUserName(userName);
    if (existingUser == null) {
      throw BusinessException.create().add(ErrorCodes.ERROR_NOT_EXISTED);
    }
    return existingUser;
  }

  @Override
  public User findByIdAndUserType(Long userId, UserType userType) {
    User user =  userRepository.findOne(userId);
    if (user == null) {
      throw new BusinessException("This entity doesn't exist.");
    }
    return user;
  }

  private User validateBeforeApproval(User user) {
    User existingUser = userRepository.findOne(user.getId());

    if (existingUser == null) {
      throw new BusinessException("This user doesn't exist.");
    }

    if (!com.google.common.base.Objects.equal(user.getVersion(), existingUser.getVersion())) {
      throw new BusinessException("User's data was old. Try to fetch new data before make approval.");
    }

    if (!Objects.equal(existingUser.getState(), RecordState.PENDING_APPROVE)) {
      throw new BusinessException("This user already have approval.");
    }

    return existingUser;
  }

  @Override
  public void approveUser(User user, UserStatus status) {
    User existingUser = this.validateBeforeApproval(user);

    existingUser.setStatus(status);
    userRepository.save(existingUser);
  }

  @Override
  @Transactional
  public void registerAuthenticationActivity(User user, AuthenticationType authenticationType, String userAgent) {
    User existingUser = userRepository.findByUserName(user.getUserName());
    if (existingUser == null) {
      throw new BusinessException("User doesn't exist.");
    }
    userActivityRepository.save(UserActivity.builder()
      .operationUser(existingUser)
      .userAgent(userAgent)
      .type(authenticationType.name())
      .build());
  }

  @Override
  public void disableUser(String userName) {
    Integer updateCount = userRepository.enableUser(userName);
    if (updateCount == 0) {
      throw new BusinessException("User doesn't exist anymore.");
    }
  }

  @Override
  public void enableUser(String userName) {
    Integer updateCount = userRepository.enableUser(userName);
    if (updateCount == 0) {
      throw new BusinessException("User doesn't exist.");
    }
  }

  @Override
  public UserDetailsImpl loadUserByUserName(String username) {
    User user = userRepository.findByUserName(username);
    return loadUser(user);
  }

  @Override
  public UserDetailsImpl loadUserById(Long id) {
    User userUser = userRepository.findOne(id);
    return loadUser(userUser);
  }

  private UserDetailsImpl loadUser(User userUser) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    UserDetailsImpl userDetails;
    if (userUser == null) {
      throw new UsernameNotFoundException(ErrorCodes.ERROR_LOGIN_INVALID_CREDENTIALS.getMessage());
    }
    Set<String> permissions = this.userPermissionRepository.findAllByUser(userUser)
      .stream()
      .map(UserPermission::getPermission)
      .map(NamedModel::getCode)
      .collect(Collectors.toSet());
    List<UserRole> userRoles = this.userRoleRepository.findAllByUser(userUser);
    if (userRoles != null) {
      for (UserRole userRole : userRoles) {
        authorities.add(new SimpleGrantedAuthority("ROLE_" + userRole.getRole().getCode().toUpperCase()));
        permissions.addAll(userRole.getRole().getPermissions().stream().map(NamedModel::getCode).collect(Collectors.toList()));
      }
    }
    if (permissions != null) {
      for (String permission : permissions) {
        GrantedAuthority authority = new SimpleGrantedAuthority(permission.toUpperCase());
        authorities.add(authority);
      }
    }
    Map<String, Object> userMap = new HashMap<>();
    userMap.put("uid", userUser.getUid());
    userMap.put("userName", userUser.getUserName());
    userMap.put("password", userUser.getPassword());
    userMap.put("isNonLocked", userUser.isNonLocked());
    userMap.put("isNonExpired", userUser.isNonExpired());
    userMap.put("isCredentialsNonExpired", userUser.isCredentialsNonExpired());
    userMap.put("isEnabled", userUser.getStatus() == UserStatus.ENABLED || userUser.getStatus() == UserStatus.APPROVED);
    userMap.put("userType", userUser.getType().toString());
    userDetails = new UserDetailsImpl(userMap, authorities);

    return userDetails;
  }

  protected void checkEmailModification(User user) {
    if(userRepository.countByIdNotAndEmail(user.getId(), user.getEmail())>0){
      throw new BusinessException("Email already exists.");
    }
  }

  protected void checkUserNameModification(User user, Errors errors) {
    if(userRepository.countByIdNotAndUserNameIgnoreCase(user.getId(), user.getUserName())>0){
      throw new BusinessException("User name already exists.");
    }
  }

  protected void checkUserNameRegistration(User user,Errors errors) {
    if(userRepository.countByUserNameIgnoreCase(user.getUserName())>0){
      errors.rejectValue("userName",null,"User name already exists.");
    }
  }

  protected void checkEmailRegistration(User user,Errors errors) {
    if(StringUtils.isNotEmpty(user.getEmail())){
      if(userRepository.countByEmail(user.getEmail())>0){
        errors.rejectValue("email",null,"This email already exists.");
      }
    }
  }
}
