# Database indexes

All indexes are defined in `backend/app/db/indexes.py` as named `IndexSpec` entries. Creation is idempotent via `create_index`. Unknown indexes are never dropped.

## Summary

| Collection          | Index name                         | Fields                             | Unique        | TTL | Rationale           |
| ------------------- | ---------------------------------- | ---------------------------------- | ------------- | --- | ------------------- |
| users               | ux_users_email_normalized_active   | email_normalized                   | yes (partial) | no  | Unique active email |
| users               | ix_users_role                      | role                               | no            | no  | Role queries        |
| users               | ix_users_account_status            | account_status                     | no            | no  | Lifecycle filter    |
| patient_profiles    | ux_patient_profiles_user_id        | user_id                            | yes           | no  | One profile/user    |
| patient_profiles    | ix_patient_profiles_is_deleted     | is_deleted                         | no            | no  | Soft-delete         |
| refresh_tokens      | ux_refresh_tokens_token_hash       | token_hash                         | yes           | no  | Hash lookup         |
| refresh_tokens      | ix_refresh_tokens_user_id          | user_id                            | no            | no  | Revocation          |
| refresh_tokens      | ix_refresh_tokens_family_id        | family_id                          | no            | no  | Rotation            |
| refresh_tokens      | ttl_refresh_tokens_expires_at      | expires_at                         | no            | 0s  | Expiry cleanup      |
| medications         | ix_medications_user_status         | user_id, status                    | no            | no  | Owner lists         |
| medications         | ix_medications_user_deleted        | user_id, is_deleted                | no            | no  | Soft-delete         |
| medications         | ix_medications_user_created        | user_id, created_at                | no            | no  | Recents             |
| medication_logs     | ix_medication_logs_user_scheduled  | user_id, scheduled_for             | no            | no  | History             |
| medication_logs     | ix_medication_logs_med_scheduled   | medication_id, scheduled_for       | no            | no  | Per med             |
| medication_logs     | ix_medication_logs_user_status     | user_id, status                    | no            | no  | Adherence           |
| appointments        | ix_appointments_user_start         | user_id, scheduled_start           | no            | no  | Schedule            |
| appointments        | ix_appointments_user_status_start  | user_id, status, scheduled_start   | no            | no  | Status lists        |
| symptom_logs        | ix_symptom_logs_user_created       | user_id, created_at                | no            | no  | History             |
| symptom_logs        | ix_symptom_logs_emergency_created  | emergency_detected, created_at     | no            | no  | Triage              |
| chat_sessions       | ix_chat_sessions_user_last_message | user_id, last_message_at           | no            | no  | Recents             |
| chat_sessions       | ix_chat_sessions_user_archived     | user_id, archived_at               | no            | no  | Archive             |
| chat_messages       | ix_chat_messages_session_created   | session_id, created_at             | no            | no  | Thread order        |
| chat_messages       | ix_chat_messages_user_created      | user_id, created_at                | no            | no  | Owner history       |
| chat_messages       | ix_chat_messages_emergency_created | emergency_detected, created_at     | no            | no  | Safety              |
| knowledge_documents | ix_knowledge_docs_status_active    | status, active                     | no            | no  | Retrieval set       |
| knowledge_documents | ix_knowledge_docs_category_status  | category, status                   | no            | no  | Review              |
| knowledge_documents | ix_knowledge_docs_source_reference | source_reference                   | no            | no  | Dedup               |
| knowledge_chunks    | ux_knowledge_chunks_document_index | document_id, chunk_index           | yes           | no  | Order               |
| knowledge_chunks    | ix_knowledge_chunks_active         | active                             | no            | no  | Active filter       |
| user_feedback       | ix_feedback_message_user           | message_id, user_id                | no            | no  | Feedback path       |
| user_feedback       | ix_feedback_type_created           | feedback_type, created_at          | no            | no  | Analytics           |
| emergency_events    | ix_emergency_status_created        | event_status, created_at           | no            | no  | Queue               |
| emergency_events    | ix_emergency_user_created          | user_id, created_at                | no            | no  | History             |
| notifications       | ix_notifications_user_read_created | user_id, read_at, created_at       | no            | no  | Unread              |
| notifications       | ttl_notifications_expires_at       | expires_at                         | no            | 0s  | Expiry              |
| audit_logs          | ix_audit_actor_created             | actor_user_id, created_at          | no            | no  | Actor timeline      |
| audit_logs          | ix_audit_entity_created            | entity_type, entity_id, created_at | no            | no  | Entity history      |
| audit_logs          | ix_audit_request_id                | request_id                         | no            | no  | Correlation         |
| schema_migrations   | ux_schema_migrations_migration_id  | migration_id                       | yes           | no  | Idempotency         |
| schema_migrations   | ix_schema_migrations_applied_at    | applied_at                         | no            | no  | History             |

## Operational risks

- Conflicting index options with the same name fail loudly (`OperationFailure`)
- TTL requires a BSON date field; null `expires_at` documents are not removed by TTL until set
- Partial unique email index depends on `is_deleted` semantics remaining consistent
