package com.project0.core.domain;

import java.time.Instant;

public interface DomainEvent {
    Instant occurredOn();
}
