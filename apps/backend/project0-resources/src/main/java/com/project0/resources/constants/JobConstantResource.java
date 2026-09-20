package com.project0.resources.constants;

import com.project0.resources.core.Base;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;

@Getter
@Setter
@NoArgsConstructor
public class JobConstantResource extends Base<JobConstantResource> {

  String name;

  public static Optional<JobConstantResource> valueOf(String key) {
    return Base.valueOf(JobConstantResource.class, key);
  }

  public static Optional<JobConstantResource> valueOf(Predicate<JobConstantResource> predicate) {
    return findFirst(JobConstantResource.class, predicate);
  }
}
