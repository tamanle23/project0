package com.project0.resources.constants;

import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;

import com.project0.core.exception.BusinessException;

import com.project0.resources.core.Base;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SwitchFlagResource extends Base<SwitchFlagResource> {

  byte dbValue;
  byte feValue;

  public static Optional<SwitchFlagResource> valueOf(String key) {
    return Base.valueOf(SwitchFlagResource.class, key);
  }

  @Override
  public Function<SwitchFlagResource, String> getCombiKeyFactory() {
    return sf -> String.format("%s-%s",sf.getDbValue(), sf.getFeValue());
  }

  public static Optional<SwitchFlagResource> valueOf(Predicate<SwitchFlagResource> predicate) {
    return findFirst(SwitchFlagResource.class, predicate);
  }

  public static SwitchFlagResource valueOf(byte dbValue) {
    return valueOf(s -> s.getDbValue() == dbValue).orElseThrow(() -> new BusinessException(String.format("SwitchFlag value not found: %s", dbValue)));
  }
  
  public static SwitchFlagResource feToDbValue(byte feValue) {
    return valueOf(s -> s.getFeValue() == feValue).orElseThrow(() -> new BusinessException(String.format("SwitchFlag value not found: %s", feValue)));
  }

}
