package com.unipost.worker.scaping.truyencuoiviet;

import com.unipost.worker.batch.BatchItemException;
import org.springframework.batch.core.step.skip.SkipLimitExceededException;
import org.springframework.batch.core.step.skip.SkipPolicy;

public class TruyenCuoiVietSkipPolicy implements SkipPolicy {
  @Override
  public boolean shouldSkip(Throwable t, long skipCount) throws SkipLimitExceededException {
    return t instanceof BatchItemException && ((BatchItemException)t).isSkip();
  }
}
