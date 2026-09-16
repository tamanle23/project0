package com.project0.service.message;

import jakarta.inject.Inject;

import com.project0.domain.message.Message;
import com.project0.repository.jpa.MessageFulltextRepository;
import com.project0.repository.jpa.MessageRepository;
import com.project0.repository.jpa.MessageSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {

	@Inject
	MessageRepository messageRepository;

	@Inject
	MessageFulltextRepository messageFulltextRepository;


	@Override
	public Page<Message> findAll(MessageSearchCriteria message,Pageable pageable) {
		return messageRepository.findAll(message, pageable);
	}



	@Override
	public Page<Message> fullTextSearch(MessageSearchCriteria criteria, Pageable pageable) {
		return messageFulltextRepository.search(criteria.toString(),pageable);
	}
}
