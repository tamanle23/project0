package com.unipost.core.io.processing;

import java.util.List;

public interface Processors<T, C> {
	public<P extends Processor<T, C>> List<P> getProcessors();
}
