package com.project0.fs.controller.validator;

import br.com.fluentvalidator.AbstractValidator;
import com.project0.fs.controller.request.ObjectCreationRequestBody;
import com.project0.fs.model.FsObject;

import static br.com.fluentvalidator.predicate.LogicalPredicate.*;
import static br.com.fluentvalidator.predicate.ObjectPredicate.*;

public class FileCreationValidator extends AbstractValidator<ObjectCreationRequestBody> {

  @Override
  public void rules() {
    setPropertyOnContext("fileCreationRequestBody");

    ruleFor(ObjectCreationRequestBody::getObject)
      .must(not(nullValue(FsObject::getName)))
        .withMessage("File's name mustn't be empty")
        .withFieldName("file")
      .critical();
  }
}
