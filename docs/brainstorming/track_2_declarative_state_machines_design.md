# Track 2: Declarative State Machines & Operational Workflows - Architectural Design & Implementation Proposal

**Target System:** `@unipost/backend` (`apps/backend/unipost-fw`)
**Target Domain:** Enterprise Dynamic Data Fabric & Metadata Engine
**Based on:** `docs/brainstorming/unlocking_full_potential_of_dynamic_metadata.md` (Section 3)
**Status:** Architectural Specification & Implementation Proposal

---

## 1. Design Strategy

### 1.1 Architectural Vision
The Unipost Metadata Engine stores dynamic records in PostgreSQL JSONB (`UNIPOST_ENTITIES`). Currently, these records are treated primarily as static data structures. However, in enterprise domain modeling, dynamic records (e.g., `JobOrder`, `ReturnTicket`, `DeploymentPolicy`, `PurchaseRequisition`) are stateful objects with well-defined operational lifecycles.

This design elevates dynamic metadata into an **Event-Driven Operational Finite State Machine (FSM)** framework integrated directly into the `@unipost/backend` write pipeline.

### 1.2 Key Architectural Objectives
1. **Declarative Lifecycle Governance**: Define state transitions, permissions, and guard validation rules declaratively in JSONB (`UNIPOST_ENTITY_TYPES.lifecycle_config`) without writing hardcoded Java workflow logic.
2. **Multi-Gate Validation Enforcement**: Intercept record mutations (`create`, `update`, `patch`, `transition`) to enforce:
   - State graph validity (valid `from` $\to$ `to` transitions).
   - Attribute presence gates (`required_attributes`).
   - Dynamic guard expression evaluation using Spring Expression Language (SpEL) or Google CEL.
   - Fine-grained role-based permission checks (`allowed_roles`).
3. **Cross-Module Event-Driven Decoupling**: Publish transactional domain events (`EntityStateChangedEvent`) upon successful state transitions via Spring's `ApplicationEventPublisher`, enabling Spring Modulith listeners (`@TransactionalEventListener(phase = AFTER_COMMIT)`) to orchestrate sagas, audit streams, and notifications asynchronously.

### 1.3 Design Patterns Applied
- **Finite State Machine (FSM) Pattern**: Encapsulates lifecycle states, valid actions, and transition rules.
- **Strategy Pattern (`GuardEvaluator`)**: Decouples guard expression evaluation algorithms (SpEL, CEL) from state machine execution logic.
- **Facade Pattern**: Enforces state machine rules transparently in `MetadataService` write operations (`createRecord`, `updateRecord`, `patchRecord`, and dedicated `transitionRecordState`).
- **Mediator Pattern / Event-Driven Architecture**: Uses Spring Modulith `ApplicationEventPublisher` to distribute state change events across domain modules.

---

## 2. Architecture

### 2.1 Data Model Specification (`lifecycle_config` Schema)

Extend `UNIPOST_ENTITY_TYPES` with a JSONB column `lifecycle_config`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "LifecycleConfig",
  "type": "object",
  "properties": {
    "state_field": {
      "type": "string",
      "default": "status",
      "description": "Attribute key in attributes JSONB payload representing state"
    },
    "initial_state": {
      "type": "string",
      "description": "Default state assigned upon record creation if state field is omitted"
    },
    "states": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Allowed state identifiers"
    },
    "transitions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "from": { "type": "string", "description": "Source state or '*' for any state" },
          "to": { "type": "string", "description": "Destination target state" },
          "action": { "type": "string", "description": "Trigger action name (e.g., SUBMIT, APPROVE, REJECT)" },
          "required_attributes": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Attributes that MUST be present and non-null before transition"
          },
          "guard_expression": {
            "type": "string",
            "description": "SpEL/CEL expression returning boolean (e.g., 'attributes.budget <= 100000')"
          },
          "allowed_roles": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Security roles permitted to execute this transition"
          }
        },
        "required": ["from", "to", "action"]
      }
    }
  },
  "required": ["state_field", "initial_state", "states", "transitions"]
}
```

### 2.2 FSM Write Pipeline Processing Flow

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 RECORD WRITE PIPELINE                                  │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. MetadataService.updateRecord() / transitionRecordState()                            │
│    - Inspect if record.attributes[state_field] is mutated or explicit action sent.     │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 2. FSM Gate 1: Security Role Validation                                                │
│    - Inspect SecurityContextHolder.getContext().getAuthentication().getAuthorities().  │
│    - Verify user possesses at least one role in transition.allowed_roles.               │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 3. FSM Gate 2: Attribute Presence Validation                                           │
│    - Ensure all transition.required_attributes exist and are non-null in payload.     │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 4. FSM Gate 3: Guard Expression Evaluation                                             │
│    - Evaluate transition.guard_expression via SpelGuardEvaluator.                     │
│    - If guard evaluates to false -> throw BusinessValidationException.                  │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 5. Record Persist & Event Publication                                                  │
│    - Save updated EntityRecord in PostgreSQL.                                         │
│    - Publish EntityStateChangedEvent(tenantId, entityTypeId, recordId, oldState, newState) │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Implementation Details

### 3.1 Domain Models & DTOs

#### `LifecycleConfig.java`
```java
package com.unipost.domain.metadata;

import java.util.List;

public record LifecycleConfig(
    String stateField,
    String initialState,
    List<String> states,
    List<TransitionConfig> transitions
) {
    public String stateFieldOrDefault() {
        return stateField != null && !stateField.isBlank() ? stateField : "status";
    }
}
```

#### `TransitionConfig.java`
```java
package com.unipost.domain.metadata;

import java.util.List;

public record TransitionConfig(
    String from,
    String to,
    String action,
    List<String> requiredAttributes,
    String guardExpression,
    List<String> allowedRoles
) {}
```

#### `EntityStateChangedEvent.java`
```java
package com.unipost.domain.metadata;

import java.time.Instant;

public record EntityStateChangedEvent(
    String tenantId,
    Long entityTypeId,
    Long recordId,
    String oldState,
    String newState,
    String action,
    String triggeredBy,
    Instant timestamp
) {}
```

### 3.2 SpEL Guard Expression Evaluator

```java
package com.unipost.service.workflow;

import lombok.extern.slf4j.Slf4j;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.security.core.Authentication;

import java.util.Map;

@Slf4j
public class SpelGuardEvaluator {

    private final ExpressionParser parser = new SpelExpressionParser();

    public boolean evaluate(String guardExpression, Map<String, Object> attributes, Authentication authentication) {
        if (guardExpression == null || guardExpression.isBlank()) {
            return true;
        }

        try {
            StandardEvaluationContext context = new StandardEvaluationContext();
            context.setVariable("attributes", attributes);
            context.setVariable("user", authentication);

            Boolean result = parser.parseExpression(guardExpression).getValue(context, Boolean.class);
            return Boolean.TRUE.equals(result);
        } catch (Exception e) {
            log.error("Failed to evaluate FSM guard expression '{}': {}", guardExpression, e.getMessage());
            return false;
        }
    }
}
```

### 3.3 Core Lifecycle Enforcement Engine

```java
package com.unipost.service.workflow;

import com.unipost.domain.metadata.*;
import com.unipost.service.exception.MetadataConflictException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class EntityLifecycleService {

    private final SpelGuardEvaluator guardEvaluator;
    private final ApplicationEventPublisher eventPublisher;

    public void initializeState(EntityType type, Map<String, Object> attributes) {
        LifecycleConfig config = type.getLifecycleConfig();
        if (config == null) return;

        String stateField = config.stateFieldOrDefault();
        if (!attributes.containsKey(stateField) && config.initialState() != null) {
            attributes.put(stateField, config.initialState());
        }
    }

    public void processTransition(EntityRecord record, String action, Map<String, Object> updatedAttributes) {
        EntityType type = record.getEntityType();
        LifecycleConfig config = type.getLifecycleConfig();
        if (config == null) return;

        String stateField = config.stateFieldOrDefault();
        String currentState = (String) record.getAttributes().getOrDefault(stateField, config.initialState());

        TransitionConfig transition = config.transitions().stream()
                .filter(t -> t.action().equalsIgnoreCase(action) &&
                        ("*".equals(t.from()) || t.from().equalsIgnoreCase(currentState)))
                .findFirst()
                .orElseThrow(() -> new MetadataConflictException(
                        "Invalid FSM transition action '" + action + "' for current state '" + currentState + "'"));

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // 1. Check allowed roles
        if (transition.allowedRoles() != null && !transition.allowedRoles().isEmpty()) {
            boolean hasRole = auth != null && auth.getAuthorities().stream()
                    .anyMatch(a -> transition.allowedRoles().contains(a.getAuthority()));
            if (!hasRole) {
                throw new MetadataConflictException("User does not possess required role to trigger transition '" + action + "'");
            }
        }

        // 2. Check required attributes
        if (transition.requiredAttributes() != null) {
            for (String reqAttr : transition.requiredAttributes()) {
                if (!updatedAttributes.containsKey(reqAttr) || updatedAttributes.get(reqAttr) == null) {
                    throw new MetadataConflictException("Missing required attribute '" + reqAttr + "' for state transition to '" + transition.to() + "'");
                }
            }
        }

        // 3. Evaluate guard expression
        if (!guardEvaluator.evaluate(transition.guardExpression(), updatedAttributes, auth)) {
            throw new MetadataConflictException("FSM Guard expression evaluation failed for transition '" + action + "'");
        }

        // Update state and publish event
        String targetState = transition.to();
        updatedAttributes.put(stateField, targetState);
        record.setAttributes(updatedAttributes);

        eventPublisher.publishEvent(new EntityStateChangedEvent(
                record.getTenantId(),
                type.getId(),
                record.getId(),
                currentState,
                targetState,
                action,
                auth != null ? auth.getName() : "system",
                Instant.now()
        ));
    }
}
```

### 3.4 Controller Endpoint Extension (`MetadataController.java`)

```java
@PostMapping("/records/{id}/transition")
public ResponseEntity<EntityRecordResponse> transitionRecordState(
        @PathVariable Long id,
        @RequestParam String action,
        @RequestBody(required = false) Map<String, Object> additionalAttributes) {
    EntityRecordResponse response = metadataService.transitionRecordState(id, action, additionalAttributes);
    return ResponseEntity.ok(response);
}
```

---

## 4. Extensibility (OCP Compliance)

### 4.1 Pluggable Guard Evaluator Interface
The guard evaluation engine adheres to the Open-Closed Principle. The strategy interface permits swapping or composing evaluation engines:

```java
public interface GuardEvaluator {
    boolean evaluate(String expression, Map<String, Object> attributes, Authentication authentication);
}
```
Implementations can include:
- `SpelGuardEvaluator` (Spring Expression Language - default)
- `CelGuardEvaluator` (Google Common Expression Language)
- `GraalJsGuardEvaluator` (JavaScript sandbox)

### 4.2 Lifecycle Transition Observers & Post-Processing
To attach side effects without modifying the core FSM engine, plugins implement the `TransitionHandler` observer interface:

```java
public interface TransitionHandler {
    void onTransition(EntityRecord record, TransitionConfig transition, Map<String, Object> attributesContext);
}
```
Spring automatically collects all `TransitionHandler` beans (e.g., `AuditLoggingTransitionHandler`, `EmailNotificationTransitionHandler`, `WebhookDispatcher`) and invokes them post-commit via Spring Modulith event listeners.

### 4.3 Zero-Code Dynamic Workflow Expansion
Because lifecycle states and transition rules are stored as dynamic metadata JSON in `UNIPOST_ENTITY_TYPES.lifecycle_config`, system administrators and low-code developers can introduce new states, permission gates, and operational rules dynamically via REST APIs without re-compiling Java code or deploying new software releases.
