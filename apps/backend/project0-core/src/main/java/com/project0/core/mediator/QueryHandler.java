package com.project0.core.mediator;

public interface QueryHandler<Q extends Query<R>, R> {
    R handle(Q query);
}
