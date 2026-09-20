package com.project0.user.model;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import com.project0.domain.BaseModel;
import com.project0.user.Constants;
import com.project0.user.model.enums.Gender;
import com.project0.user.model.enums.MaritalStatus;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = Constants.TABLE_PREFIX + "userProfile")
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class UserProfile extends BaseModel {

  private static final long serialVersionUID = 3379226982403749296L;

  private String dateFormat = "dd/MM/yyyy";

  private String dateTimeFormat = "dd/MM/yyyy HH:mm:ss";

  private String locale = "en_US";

  @OneToOne(fetch = FetchType.EAGER)
  private User parent;

  private String title;

  private LocalDateTime birthday;

  @Transient
  private Integer age;

  private String picturePath;

  private String workAddress;

  @Enumerated(EnumType.STRING)
  private MaritalStatus maritalStatus = MaritalStatus.SINGLE;

  private String occupation;

  private String nationality;

  private String race;

  private String callingCode;

  private String contactNumber;

  @OneToMany
  private List<Address> addresses;

  @Enumerated(EnumType.ORDINAL)
  private Gender sex;

  @PostLoad
  private void postLoadProfileUser() {
    if (this.getBirthday() != null) {
      // Calendar birthdayCalendar = Calendar.getInstance();
      // birthdayCalendar.setTimeInMillis(this.getBirthday().getTime());
      // this.age = Calendar.getInstance().get(Calendar.YEAR) -
      // birthdayCalendar.get(Calendar.YEAR);

      LocalDateTime now = LocalDateTime.now();
      this.age = (int) (Duration.between(this.getBirthday(), now).toDays() / 365);
    }
  }

}
