package com.project0.service;

import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.EntityRecord;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class EntityRecordSpecifications {

    private EntityRecordSpecifications() {}

    public static Specification<EntityRecord> withFilters(
            Long entityTypeId,
            String tenantId,
            Map<String, Map<String, String>> filterParams,
            Map<String, AttributeDefinition> activeAttributes
    ) {
        return (Root<EntityRecord> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. EntityTypeId match
            predicates.add(cb.equal(root.get("entityType").get("id"), entityTypeId));

            // 2. Soft-delete check
            predicates.add(cb.isNull(root.get("deletedDate")));

            // 3. Tenancy check
            if (tenantId != null && !tenantId.isBlank()) {
                predicates.add(cb.equal(root.get("tenantId"), tenantId));
            }

            // 4. Attribute filters using PostgreSQL jsonb_extract_path_text
            if (filterParams != null && !filterParams.isEmpty() && activeAttributes != null) {
                for (Map.Entry<String, Map<String, String>> entry : filterParams.entrySet()) {
                    String attrName = entry.getKey();
                    AttributeDefinition attr = activeAttributes.get(attrName);

                    // Whitelist to defined, non-archived attributes only
                    if (attr == null || Boolean.TRUE.equals(attr.getIsArchived())) {
                        continue;
                    }

                    Map<String, String> ops = entry.getValue();
                    if (ops == null) continue;

                    String dataType = attr.getDataType() != null ? attr.getDataType().trim().toLowerCase() : "string";

                    for (Map.Entry<String, String> opEntry : ops.entrySet()) {
                        String op = opEntry.getKey().trim().toLowerCase();
                        String val = opEntry.getValue();
                        if (val == null) continue;

                        Expression<String> jsonTextVal = cb.function(
                                "jsonb_extract_path_text",
                                String.class,
                                root.get("attributes"),
                                cb.literal(attrName)
                        );

                        switch (op) {
                            case "eq" -> {
                                predicates.add(cb.equal(jsonTextVal, val));
                            }
                            case "ne" -> {
                                predicates.add(cb.notEqual(jsonTextVal, val));
                            }
                            case "contains" -> {
                                predicates.add(cb.like(cb.lower(jsonTextVal), "%" + val.toLowerCase() + "%"));
                            }
                            case "gt", "gte", "lt", "lte" -> {
                                if ("number".equals(dataType) || "integer".equals(dataType)) {
                                    try {
                                        Double numVal = Double.parseDouble(val);
                                        Expression<Double> castDouble = jsonTextVal.as(Double.class);
                                        switch (op) {
                                            case "gt" -> predicates.add(cb.greaterThan(castDouble, numVal));
                                            case "gte" -> predicates.add(cb.greaterThanOrEqualTo(castDouble, numVal));
                                            case "lt" -> predicates.add(cb.lessThan(castDouble, numVal));
                                            case "lte" -> predicates.add(cb.lessThanOrEqualTo(castDouble, numVal));
                                        }
                                    } catch (NumberFormatException ignored) {}
                                } else {
                                    switch (op) {
                                        case "gt" -> predicates.add(cb.greaterThan(jsonTextVal, val));
                                        case "gte" -> predicates.add(cb.greaterThanOrEqualTo(jsonTextVal, val));
                                        case "lt" -> predicates.add(cb.lessThan(jsonTextVal, val));
                                        case "lte" -> predicates.add(cb.lessThanOrEqualTo(jsonTextVal, val));
                                    }
                                }
                            }
                            case "in" -> {
                                String[] parts = val.split(",");
                                CriteriaBuilder.In<String> inClause = cb.in(jsonTextVal);
                                for (String p : parts) {
                                    inClause.value(p.trim());
                                }
                                predicates.add(inClause);
                            }
                            default -> {
                                predicates.add(cb.equal(jsonTextVal, val));
                            }
                        }
                    }
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
