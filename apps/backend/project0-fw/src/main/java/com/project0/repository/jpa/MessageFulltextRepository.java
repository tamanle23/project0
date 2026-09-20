package com.project0.repository.jpa;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import com.project0.domain.message.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MessageFulltextRepository {

	@PersistenceContext
	private EntityManager entityManager;

	public Page<Message> search(String text, Pageable pageable) {
		String pattern = "%" + (text == null ? "" : text) + "%";
		String countJpql = "SELECT COUNT(m) FROM Message m WHERE m.message LIKE :text OR m.messageKey LIKE :text OR m.basename LIKE :text OR m.language LIKE :text OR m.country LIKE :text";
		Long totalElements = entityManager.createQuery(countJpql, Long.class)
				.setParameter("text", pattern)
				.getSingleResult();

		String selectJpql = "SELECT m FROM Message m WHERE m.message LIKE :text OR m.messageKey LIKE :text OR m.basename LIKE :text OR m.language LIKE :text OR m.country LIKE :text";
		TypedQuery<Message> query = entityManager.createQuery(selectJpql, Message.class)
				.setParameter("text", pattern)
				.setFirstResult((int) pageable.getOffset())
				.setMaxResults(pageable.getPageSize());

		List<Message> content = query.getResultList();
		return new PageImpl<>(content, pageable, totalElements);
	}
}
