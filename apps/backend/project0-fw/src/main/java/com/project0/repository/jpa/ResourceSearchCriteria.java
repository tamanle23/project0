package com.project0.repository.jpa;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import com.project0.domain.resource.Resource;
import com.project0.repository.helpers.CriteriaHelper;
import org.springframework.data.jpa.domain.Specification;

public class ResourceSearchCriteria extends Resource implements Specification<Resource> {

	private static final long serialVersionUID = 6025788894371528636L;

	@Override
	public Predicate toPredicate(Root<Resource> root,CriteriaQuery<?> criteriaquery, CriteriaBuilder criteriabuilder) {
		return criteriabuilder.and(criteriabuilder.like(criteriabuilder.lower(root.<String>get("value")),CriteriaHelper.getContainsLikePattern(this.getValue())),
									criteriabuilder.equal(root.<String>get("category"), this.getCategory()));
	}

}
