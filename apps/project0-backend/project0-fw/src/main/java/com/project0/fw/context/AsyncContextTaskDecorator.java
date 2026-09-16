package com.project0.fw.context;

import org.springframework.core.task.TaskDecorator;

import com.project0.core.context.Context;
import com.project0.core.io.ContextHeader;

public class AsyncContextTaskDecorator implements TaskDecorator {

  private Context context;

  public AsyncContextTaskDecorator(Context contextHelper){
    this.context = contextHelper;
  }

  @Override
  public Runnable decorate(Runnable runnable) {
    ContextHeader currentContext = context.getHeader();
    return () -> {
      try {
        context.setRequestHeader(currentContext);
        runnable.run();
      } finally {
        context.clear();
      }
    };
  }
}
