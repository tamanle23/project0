package com.unipost.core.mediator;

public interface CommandDispatcher {
    <R, C extends Command<R>> R dispatch(C command);
}
