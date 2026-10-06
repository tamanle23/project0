package com.unipost.service.message;

import jakarta.inject.Inject;

import com.unipost.domain.message.Message;
import com.unipost.repository.jpa.MessageFulltextRepository;
import com.unipost.repository.jpa.MessageRepository;
import com.unipost.repository.jpa.MessageSearchCriteria;
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
