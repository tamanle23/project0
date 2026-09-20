package com.project0.workflow;

public enum RecordState {
  DRAFT,
  PENDING_REWORK,
  PENDING_VERIFY,
  PENDING_APPROVE,

  REJECTED,
  APPROVED,
  PUBLISHED,
  DELETED
}
