package com.unipost.core.io.processing;

public interface Processor<T, C> {
	public abstract void process(T input, C context);
}
