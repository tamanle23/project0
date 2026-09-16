package com.project0.user.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.project0.domain.TimeRecordModel;

import com.project0.user.Constants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=true)
@Builder
@Entity
@Table(name = Constants.TABLE_PREFIX + "userActivity")
public class UserActivity extends TimeRecordModel{

  private static final long serialVersionUID = 4631272197492239308L;
  @ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
  private User operationUser;
  private String type;
  private String userAgent;
  private String ip;
  private String expires;
  private String requestMethod;
  private String url;
}
