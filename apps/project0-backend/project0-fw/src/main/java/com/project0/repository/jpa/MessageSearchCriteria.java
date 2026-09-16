package com.project0.repository.jpa;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import com.project0.domain.message.Message;
import com.project0.repository.helpers.CriteriaHelper;
import org.springframework.data.jpa.domain.Specification;

public class MessageSearchCriteria extends Message implements Specification<Message> {

	private static final long serialVersionUID = -6019784132716027681L;

	@Override
	public Predicate toPredicate(Root<Message> root,CriteriaQuery<?> criteriaquery, CriteriaBuilder criteriabuilder) {
		return criteriabuilder.and(criteriabuilder.like(criteriabuilder.lower(root.<String>get("message")),CriteriaHelper.getContainsLikePattern(this.getMessage())),
								criteriabuilder.like(criteriabuilder.lower(root.<String>get("basename")),CriteriaHelper.getContainsLikePattern(this.getBasename())),
								criteriabuilder.equal(root.<String>get("country"), this.getCountry()),
								criteriabuilder.equal(root.<String>get("language"), this.getLanguage()));
	}

}
