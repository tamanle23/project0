package com.project0.service.message;

import com.project0.domain.message.Message;
import com.project0.repository.jpa.MessageSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MessageService {
	public Page<Message> findAll(MessageSearchCriteria message,Pageable pageable);

	public Page<Message> fullTextSearch(MessageSearchCriteria criteria, Pageable pageable);
}
