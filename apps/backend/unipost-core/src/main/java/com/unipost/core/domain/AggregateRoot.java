package com.unipost.core.domain;

public abstract class AggregateRoot<ID> {
    private ID id;

    public ID getId() {
        return id;
    }

    protected void setId(ID id) {
        this.id = id;
    }
}
