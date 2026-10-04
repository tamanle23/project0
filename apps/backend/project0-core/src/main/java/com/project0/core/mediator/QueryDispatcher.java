package com.project0.core.mediator;

public interface QueryDispatcher {
    <R, Q extends Query<R>> R dispatch(Q query);
}
