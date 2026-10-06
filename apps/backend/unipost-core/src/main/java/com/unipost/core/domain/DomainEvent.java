package com.unipost.core.domain;

import java.time.Instant;

public interface DomainEvent {
    Instant occurredOn();
}
