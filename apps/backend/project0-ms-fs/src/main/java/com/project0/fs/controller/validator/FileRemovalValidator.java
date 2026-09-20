package com.project0.fs.controller.validator;

import br.com.fluentvalidator.AbstractValidator;
import com.project0.fs.controller.request.FileRemovalRequestBody;

import static br.com.fluentvalidator.predicate.LogicalPredicate.not;
import static br.com.fluentvalidator.predicate.CollectionPredicate.*;

public class FileRemovalValidator extends AbstractValidator<FileRemovalRequestBody> {

  @Override
  public void rules() {
    setPropertyOnContext("fileRemovalRequestBody");

    ruleFor(FileRemovalRequestBody::getUids)
      .must(not(empty()))
        .withMessage("Uids's mustn't be empty")
        .withFieldName("uids")
      .critical();
  }
}
