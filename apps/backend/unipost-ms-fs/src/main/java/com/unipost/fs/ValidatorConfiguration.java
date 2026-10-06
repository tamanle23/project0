package com.unipost.fs;

import br.com.fluentvalidator.Validator;
import com.unipost.fs.controller.validator.FileCreationValidator;
import com.unipost.fs.controller.validator.FileDropValidator;
import com.unipost.fs.controller.validator.FileRemovalValidator;
import com.unipost.fs.controller.request.ObjectCreationRequestBody;
import com.unipost.fs.controller.request.FileDropRequestBody;
import com.unipost.fs.controller.request.FileRemovalRequestBody;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(value = "com.unipost.fs.ValidatorConfiguration")
public class ValidatorConfiguration {

  public static final String FILE_CREATION = "FILE_CREATION_VALIDATOR";
  public static final String FILE_DELETE = "FILE_DELETE";
  public static final String FILE_DROP = "FILE_DROP";

  @Bean(name = FILE_CREATION)
  public Validator<ObjectCreationRequestBody> getFileCreationValidator() {
    return new FileCreationValidator();
  }

  @Bean(name = FILE_DELETE)
  public Validator<FileRemovalRequestBody> getFileDeleteValidator() {
    return new FileRemovalValidator();
  }

  @Bean(name = FILE_DROP)
  public Validator<FileDropRequestBody> getFileDropValidator() {
    return new FileDropValidator();
  }
}
