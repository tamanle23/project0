package com.unipost.service.message;

import com.unipost.domain.message.Message;
import com.unipost.repository.jpa.MessageSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MessageService {
	public Page<Message> findAll(MessageSearchCriteria message,Pageable pageable);

	public Page<Message> fullTextSearch(MessageSearchCriteria criteria, Pageable pageable);
}
