// Auto-generated Enterprise Cloud Catalog Specification & Record Generator
// Generated to support 101 realistic models with scalable UI facet bucketing and pagination.
import type { AttributeDefinition, EntityRecord, EntityType } from '../api/types';

export const additionalEntityTypes: EntityType[] = [
  {
    "id": "4",
    "name": "Virtual Machine Instance",
    "systemName": "virtual_machine",
    "description": "Virtual compute instances with attached networking, disk volumes, and security profiles.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "5",
    "name": "Kubernetes Cluster",
    "systemName": "k8s_cluster",
    "description": "Managed Kubernetes control planes, autoscalers, and worker node pools.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "6",
    "name": "Container Image Repository",
    "systemName": "container_image_repo",
    "description": "OCI-compliant container image repositories, vulnerability scan policies, and retention rules.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "7",
    "name": "Serverless Function",
    "systemName": "serverless_function",
    "description": "Event-driven serverless compute handlers, trigger routes, and cold-start optimizers.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "8",
    "name": "API Gateway Endpoint",
    "systemName": "api_gateway_endpoint",
    "description": "Unified HTTP, REST, and gRPC endpoints, rate limit throttles, and token authorizers.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "9",
    "name": "Virtual Private Cloud",
    "systemName": "vpc_network",
    "description": "Isolated software-defined cloud networking topologies and CIDR address blocks.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "10",
    "name": "Subnet Allocation",
    "systemName": "subnet_allocation",
    "description": "Subnet CIDR blocks, availability zone assignments, and routing boundaries.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "11",
    "name": "Route Table Entry",
    "systemName": "route_table_entry",
    "description": "Network packet forwarding rules, gateway destinations, and peering peering hops.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "12",
    "name": "Security Group Policy",
    "systemName": "security_group_policy",
    "description": "Stateful virtual firewall rules regulating ingress and egress traffic for compute instances.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "13",
    "name": "Firewall Rule Definition",
    "systemName": "firewall_rule_def",
    "description": "Stateless perimeter inspection rules and IP reputation blacklists.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "14",
    "name": "Network Interface Card",
    "systemName": "network_interface",
    "description": "Enterprise configuration, governance policy, and telemetry records for network interface card within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "15",
    "name": "Elastic IP Address",
    "systemName": "elastic_ip_address",
    "description": "Enterprise configuration, governance policy, and telemetry records for elastic ip address within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "16",
    "name": "DNS Hosted Zone",
    "systemName": "dns_hosted_zone",
    "description": "Enterprise configuration, governance policy, and telemetry records for dns hosted zone within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "17",
    "name": "DNS Record Entry",
    "systemName": "dns_record_entry",
    "description": "Enterprise configuration, governance policy, and telemetry records for dns record entry within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "18",
    "name": "Application Load Balancer",
    "systemName": "app_load_balancer",
    "description": "Enterprise configuration, governance policy, and telemetry records for application load balancer within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "19",
    "name": "Target Backend Group",
    "systemName": "target_backend_group",
    "description": "Enterprise configuration, governance policy, and telemetry records for target backend group within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "20",
    "name": "SSL/TLS Digital Certificate",
    "systemName": "tls_certificate",
    "description": "Enterprise configuration, governance policy, and telemetry records for ssl/tls digital certificate within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "21",
    "name": "WAF Web ACL",
    "systemName": "waf_web_acl",
    "description": "Enterprise configuration, governance policy, and telemetry records for waf web acl within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "22",
    "name": "DDoS Shield Plan",
    "systemName": "ddos_shield_plan",
    "description": "Enterprise configuration, governance policy, and telemetry records for ddos shield plan within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "23",
    "name": "Block Storage Volume",
    "systemName": "block_storage_volume",
    "description": "Enterprise configuration, governance policy, and telemetry records for block storage volume within Storage.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "24",
    "name": "Object Storage Bucket",
    "systemName": "object_storage_bucket",
    "description": "Enterprise configuration, governance policy, and telemetry records for object storage bucket within Storage.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "25",
    "name": "Distributed File System Mount",
    "systemName": "distributed_fs_mount",
    "description": "Enterprise configuration, governance policy, and telemetry records for distributed file system mount within Storage.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "26",
    "name": "Relational Database Instance",
    "systemName": "relational_db_instance",
    "description": "Enterprise configuration, governance policy, and telemetry records for relational database instance within Database.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "27",
    "name": "Database Read Replica",
    "systemName": "db_read_replica",
    "description": "Enterprise configuration, governance policy, and telemetry records for database read replica within Database.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "28",
    "name": "NoSQL Document Table",
    "systemName": "nosql_doc_table",
    "description": "Enterprise configuration, governance policy, and telemetry records for nosql document table within Database.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "29",
    "name": "In-Memory Cache Cluster",
    "systemName": "in_memory_cache",
    "description": "Enterprise configuration, governance policy, and telemetry records for in-memory cache cluster within Database.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "30",
    "name": "Vector Index Namespace",
    "systemName": "vector_index_namespace",
    "description": "Enterprise configuration, governance policy, and telemetry records for vector index namespace within Database.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "31",
    "name": "Message Queue Broker",
    "systemName": "message_queue_broker",
    "description": "Enterprise configuration, governance policy, and telemetry records for message queue broker within Messaging.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "32",
    "name": "Event Streaming Stream",
    "systemName": "event_streaming_topic",
    "description": "Enterprise configuration, governance policy, and telemetry records for event streaming stream within Messaging.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "33",
    "name": "Schema Registry Artifact",
    "systemName": "schema_registry_artifact",
    "description": "Enterprise configuration, governance policy, and telemetry records for schema registry artifact within Messaging.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "34",
    "name": "Data Pipeline Workflow",
    "systemName": "data_pipeline_workflow",
    "description": "Enterprise configuration, governance policy, and telemetry records for data pipeline workflow within Data & ETL.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "35",
    "name": "Batch Spark Job Execution",
    "systemName": "spark_job_execution",
    "description": "Enterprise configuration, governance policy, and telemetry records for batch spark job execution within Data & ETL.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "36",
    "name": "Data Lake Lakehouse Catalog",
    "systemName": "lakehouse_catalog",
    "description": "Enterprise configuration, governance policy, and telemetry records for data lake lakehouse catalog within Data & ETL.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "37",
    "name": "Cloud Data Warehouse Warehouse",
    "systemName": "data_warehouse_warehouse",
    "description": "Enterprise configuration, governance policy, and telemetry records for cloud data warehouse warehouse within Data & ETL.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "38",
    "name": "Machine Learning Model Version",
    "systemName": "ml_model_version",
    "description": "Enterprise configuration, governance policy, and telemetry records for machine learning model version within AI & ML.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "39",
    "name": "Model Training Run",
    "systemName": "ml_training_run",
    "description": "Enterprise configuration, governance policy, and telemetry records for model training run within AI & ML.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "40",
    "name": "Realtime Inference Endpoint",
    "systemName": "inference_endpoint",
    "description": "Enterprise configuration, governance policy, and telemetry records for realtime inference endpoint within AI & ML.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "41",
    "name": "Feature Store Feature View",
    "systemName": "feature_store_view",
    "description": "Enterprise configuration, governance policy, and telemetry records for feature store feature view within AI & ML.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "42",
    "name": "SAML/OIDC Identity Provider",
    "systemName": "saml_identity_provider",
    "description": "Enterprise configuration, governance policy, and telemetry records for saml/oidc identity provider within Identity.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "43",
    "name": "Corporate User Profile",
    "systemName": "corporate_user_profile",
    "description": "Enterprise configuration, governance policy, and telemetry records for corporate user profile within Identity.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "44",
    "name": "IAM Role Assignment",
    "systemName": "iam_role_assignment",
    "description": "Enterprise configuration, governance policy, and telemetry records for iam role assignment within Identity.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "45",
    "name": "Access Control Privilege",
    "systemName": "access_control_privilege",
    "description": "Enterprise configuration, governance policy, and telemetry records for access control privilege within Identity.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "46",
    "name": "Automated Service Account",
    "systemName": "automated_service_account",
    "description": "Enterprise configuration, governance policy, and telemetry records for automated service account within Identity.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "47",
    "name": "API Key Credential Token",
    "systemName": "api_key_token",
    "description": "Enterprise configuration, governance policy, and telemetry records for api key credential token within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "48",
    "name": "Secrets Manager Vault Secret",
    "systemName": "vault_secret_entry",
    "description": "Enterprise configuration, governance policy, and telemetry records for secrets manager vault secret within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "49",
    "name": "KMS Customer Master Key",
    "systemName": "kms_master_key",
    "description": "Enterprise configuration, governance policy, and telemetry records for kms customer master key within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "50",
    "name": "Immutable Audit Log Pipe",
    "systemName": "audit_log_pipe",
    "description": "Enterprise configuration, governance policy, and telemetry records for immutable audit log pipe within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "51",
    "name": "SIEM Incident Detection Rule",
    "systemName": "siem_detection_rule",
    "description": "Enterprise configuration, governance policy, and telemetry records for siem incident detection rule within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "52",
    "name": "Vulnerability CVE Finding",
    "systemName": "cve_vulnerability_finding",
    "description": "Enterprise configuration, governance policy, and telemetry records for vulnerability cve finding within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "53",
    "name": "Container SBOM Scan",
    "systemName": "container_sbom_scan",
    "description": "Enterprise configuration, governance policy, and telemetry records for container sbom scan within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "54",
    "name": "Compliance Benchmark Audit",
    "systemName": "compliance_benchmark_audit",
    "description": "Enterprise configuration, governance policy, and telemetry records for compliance benchmark audit within Governance.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "55",
    "name": "Production Incident Ticket",
    "systemName": "prod_incident_ticket",
    "description": "Enterprise configuration, governance policy, and telemetry records for production incident ticket within Operations.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "56",
    "name": "On-Call Pager Schedule",
    "systemName": "oncall_pager_schedule",
    "description": "Enterprise configuration, governance policy, and telemetry records for on-call pager schedule within Operations.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "57",
    "name": "Escalation Alert Notification",
    "systemName": "alert_notification_channel",
    "description": "Enterprise configuration, governance policy, and telemetry records for escalation alert notification within Operations.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "58",
    "name": "Prometheus Metric Alert Rule",
    "systemName": "metric_alert_definition",
    "description": "Enterprise configuration, governance policy, and telemetry records for prometheus metric alert rule within Observability.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "59",
    "name": "Synthetic Ping Probe",
    "systemName": "synthetic_ping_probe",
    "description": "Enterprise configuration, governance policy, and telemetry records for synthetic ping probe within Observability.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "60",
    "name": "Log Index Query Saved",
    "systemName": "saved_log_query",
    "description": "Enterprise configuration, governance policy, and telemetry records for log index query saved within Observability.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "61",
    "name": "OpenTelemetry Trace Span",
    "systemName": "opentelemetry_span",
    "description": "Enterprise configuration, governance policy, and telemetry records for opentelemetry trace span within Observability.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "62",
    "name": "APM Microservice Health",
    "systemName": "apm_service_health",
    "description": "Enterprise configuration, governance policy, and telemetry records for apm microservice health within Observability.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "63",
    "name": "Synthetic Health Check Ping",
    "systemName": "synthetic_health_check",
    "description": "Enterprise configuration, governance policy, and telemetry records for synthetic health check ping within Observability.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "64",
    "name": "Service Level Objective (SLO)",
    "systemName": "slo_definition_target",
    "description": "Enterprise configuration, governance policy, and telemetry records for service level objective (slo) within Operations.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "65",
    "name": "Customer Facing Status Page",
    "systemName": "status_page_bulletin",
    "description": "Enterprise configuration, governance policy, and telemetry records for customer facing status page within Operations.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "66",
    "name": "Cost Allocation FinOps Tag",
    "systemName": "finops_cost_tag",
    "description": "Enterprise configuration, governance policy, and telemetry records for cost allocation finops tag within FinOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "67",
    "name": "Cloud Monthly Budget Plan",
    "systemName": "monthly_budget_plan",
    "description": "Enterprise configuration, governance policy, and telemetry records for cloud monthly budget plan within FinOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "68",
    "name": "FinOps Cost Spike Anomaly",
    "systemName": "cost_spike_anomaly",
    "description": "Enterprise configuration, governance policy, and telemetry records for finops cost spike anomaly within FinOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "69",
    "name": "Reserved Instance Commitment",
    "systemName": "reserved_instance_lease",
    "description": "Enterprise configuration, governance policy, and telemetry records for reserved instance commitment within FinOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "70",
    "name": "Savings Plan Contract",
    "systemName": "savings_plan_contract",
    "description": "Enterprise configuration, governance policy, and telemetry records for savings plan contract within FinOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "71",
    "name": "Cloud Provider Invoice Statement",
    "systemName": "provider_invoice_statement",
    "description": "Enterprise configuration, governance policy, and telemetry records for cloud provider invoice statement within FinOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "72",
    "name": "Credit Card Billing Profile",
    "systemName": "billing_payment_profile",
    "description": "Enterprise configuration, governance policy, and telemetry records for credit card billing profile within FinOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "73",
    "name": "CI/CD Pipeline Flow",
    "systemName": "cicd_pipeline_flow",
    "description": "Enterprise configuration, governance policy, and telemetry records for ci/cd pipeline flow within DevOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "74",
    "name": "Software Build Artifact",
    "systemName": "build_artifact_tar",
    "description": "Enterprise configuration, governance policy, and telemetry records for software build artifact within DevOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "75",
    "name": "Git Source Repository Webhook",
    "systemName": "git_repo_webhook",
    "description": "Enterprise configuration, governance policy, and telemetry records for git source repository webhook within DevOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "76",
    "name": "Deployment Target Environment",
    "systemName": "deployment_target_env",
    "description": "Enterprise configuration, governance policy, and telemetry records for deployment target environment within DevOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "77",
    "name": "Terraform IaC Stack",
    "systemName": "terraform_iac_stack",
    "description": "Enterprise configuration, governance policy, and telemetry records for terraform iac stack within DevOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "78",
    "name": "Distributed Statefile Lock",
    "systemName": "statefile_lock_record",
    "description": "Enterprise configuration, governance policy, and telemetry records for distributed statefile lock within DevOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "79",
    "name": "Private Container Registry",
    "systemName": "private_registry_space",
    "description": "Enterprise configuration, governance policy, and telemetry records for private container registry within DevOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "80",
    "name": "Helm Chart Deployment Release",
    "systemName": "helm_chart_release",
    "description": "Enterprise configuration, governance policy, and telemetry records for helm chart deployment release within DevOps.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "81",
    "name": "Istio Service Mesh Gateway",
    "systemName": "istio_mesh_gateway",
    "description": "Enterprise configuration, governance policy, and telemetry records for istio service mesh gateway within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "82",
    "name": "Ingress Controller Route Map",
    "systemName": "ingress_route_map",
    "description": "Enterprise configuration, governance policy, and telemetry records for ingress controller route map within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "83",
    "name": "Envoy Filter Plugin",
    "systemName": "envoy_filter_plugin",
    "description": "Enterprise configuration, governance policy, and telemetry records for envoy filter plugin within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "84",
    "name": "Mutual TLS Mutual Certificate",
    "systemName": "mtls_mutual_cert",
    "description": "Enterprise configuration, governance policy, and telemetry records for mutual tls mutual certificate within Security.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "85",
    "name": "Cross-Cloud Network Peering",
    "systemName": "cross_cloud_peering",
    "description": "Enterprise configuration, governance policy, and telemetry records for cross-cloud network peering within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "86",
    "name": "Transit Gateway Attachment Link",
    "systemName": "tgw_attachment_link",
    "description": "Enterprise configuration, governance policy, and telemetry records for transit gateway attachment link within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "87",
    "name": "IPSec VPN Tunnel Gateway",
    "systemName": "ipsec_vpn_tunnel",
    "description": "Enterprise configuration, governance policy, and telemetry records for ipsec vpn tunnel gateway within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "88",
    "name": "Direct Cloud Interconnect Circuit",
    "systemName": "direct_interconnect_circuit",
    "description": "Enterprise configuration, governance policy, and telemetry records for direct cloud interconnect circuit within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "89",
    "name": "High-Throughput NAT Router",
    "systemName": "high_throughput_nat",
    "description": "Enterprise configuration, governance policy, and telemetry records for high-throughput nat router within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "90",
    "name": "Cloud CDN Global Distribution",
    "systemName": "cdn_global_distribution",
    "description": "Enterprise configuration, governance policy, and telemetry records for cloud cdn global distribution within Networking.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "91",
    "name": "Edge Worker Compute Lambda",
    "systemName": "edge_worker_lambda",
    "description": "Enterprise configuration, governance policy, and telemetry records for edge worker compute lambda within Compute.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "92",
    "name": "WebSocket Long-Lived Session",
    "systemName": "websocket_live_session",
    "description": "Enterprise configuration, governance policy, and telemetry records for websocket long-lived session within Messaging.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "93",
    "name": "Inbound Webhook Receiver",
    "systemName": "inbound_webhook_receiver",
    "description": "Enterprise configuration, governance policy, and telemetry records for inbound webhook receiver within Integration.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "94",
    "name": "Mobile Push Notification Channel",
    "systemName": "mobile_push_channel",
    "description": "Enterprise configuration, governance policy, and telemetry records for mobile push notification channel within Integration.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "95",
    "name": "Transactional Email Template",
    "systemName": "transactional_email_template",
    "description": "Enterprise configuration, governance policy, and telemetry records for transactional email template within Integration.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "96",
    "name": "SMS Carrier Outbound Campaign",
    "systemName": "sms_carrier_campaign",
    "description": "Enterprise configuration, governance policy, and telemetry records for sms carrier outbound campaign within Integration.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "97",
    "name": "IoT Edge Device Registry",
    "systemName": "iot_edge_device",
    "description": "Enterprise configuration, governance policy, and telemetry records for iot edge device registry within IoT.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "98",
    "name": "IoT High-Frequency Telemetry",
    "systemName": "iot_telemetry_stream",
    "description": "Enterprise configuration, governance policy, and telemetry records for iot high-frequency telemetry within IoT.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "99",
    "name": "IoT Twin Device Shadow",
    "systemName": "iot_twin_device_shadow",
    "description": "Enterprise configuration, governance policy, and telemetry records for iot twin device shadow within IoT.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "100",
    "name": "Edge Gateway Firmware Patch",
    "systemName": "firmware_patch_version",
    "description": "Enterprise configuration, governance policy, and telemetry records for edge gateway firmware patch within IoT.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  },
  {
    "id": "101",
    "name": "Disaster Recovery Snapshot Job",
    "systemName": "snapshot_dr_job",
    "description": "Enterprise configuration, governance policy, and telemetry records for disaster recovery snapshot job within Storage.",
    "schemaVersion": 1,
    "version": 1,
    "createdDate": "2026-01-20T00:00:00.000Z",
    "updatedDate": "2026-03-22T00:00:00.000Z"
  }
];

export const additionalAttributes: Record<string, AttributeDefinition[]> = {
  '4': [
  {
    "id": "401",
    "entityTypeId": "4",
    "name": "Instance Identifier",
    "systemName": "instance_id",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "402",
    "entityTypeId": "4",
    "name": "Lifecycle Status",
    "systemName": "lifecycle_status",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Running",
    "options": {
      "choices": [
        "Running",
        "Stopped",
        "Provisioning",
        "Terminated",
        "Suspended"
      ]
    }
  },
  {
    "id": "403",
    "entityTypeId": "4",
    "name": "CPU Utilization (%)",
    "systemName": "cpu_utilization",
    "dataType": "DECIMAL",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "options": {
      "min": 0,
      "max": 100
    }
  },
  {
    "id": "404",
    "entityTypeId": "4",
    "name": "Termination Protection",
    "systemName": "termination_protection",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "405",
    "entityTypeId": "4",
    "name": "Launch Timestamp",
    "systemName": "launched_at",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '5': [
  {
    "id": "501",
    "entityTypeId": "5",
    "name": "Cluster Name",
    "systemName": "cluster_name",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "502",
    "entityTypeId": "5",
    "name": "Kubernetes Engine Version",
    "systemName": "engine_version",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "v1.29.2",
    "options": {
      "choices": [
        "v1.28.6",
        "v1.29.2",
        "v1.30.1",
        "v1.31.0"
      ]
    }
  },
  {
    "id": "503",
    "entityTypeId": "5",
    "name": "Total Node Count",
    "systemName": "node_count",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": true,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "6",
    "options": {
      "min": 1,
      "max": 500
    }
  },
  {
    "id": "504",
    "entityTypeId": "5",
    "name": "Autopilot Enabled",
    "systemName": "autopilot_enabled",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "505",
    "entityTypeId": "5",
    "name": "Cluster Creation Date",
    "systemName": "created_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '6': [
  {
    "id": "601",
    "entityTypeId": "6",
    "name": "Repository Tag Path",
    "systemName": "repo_path",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "602",
    "entityTypeId": "6",
    "name": "Access Tier",
    "systemName": "access_tier",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": false,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Private",
    "options": {
      "choices": [
        "Public",
        "Private",
        "Internal",
        "Restricted"
      ]
    }
  },
  {
    "id": "603",
    "entityTypeId": "6",
    "name": "Digest Count",
    "systemName": "digest_count",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "25",
    "options": {
      "min": 1,
      "max": 1000
    }
  },
  {
    "id": "604",
    "entityTypeId": "6",
    "name": "Scan on Push",
    "systemName": "scan_on_push",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "605",
    "entityTypeId": "6",
    "name": "Last Push Timestamp",
    "systemName": "last_push_at",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '7': [
  {
    "id": "701",
    "entityTypeId": "7",
    "name": "Function System Name",
    "systemName": "function_name",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "702",
    "entityTypeId": "7",
    "name": "Runtime Platform",
    "systemName": "runtime_platform",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": false,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "NodeJS 20",
    "options": {
      "choices": [
        "NodeJS 20",
        "Python 3.12",
        "Go 1.22",
        "Java 21",
        "Rust 1.78"
      ]
    }
  },
  {
    "id": "703",
    "entityTypeId": "7",
    "name": "Memory Limit (MB)",
    "systemName": "memory_mb",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "512",
    "options": {
      "min": 128,
      "max": 10240
    }
  },
  {
    "id": "704",
    "entityTypeId": "7",
    "name": "Warm Pool Concurrency",
    "systemName": "warm_pool_enabled",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "false"
  },
  {
    "id": "705",
    "entityTypeId": "7",
    "name": "Deploy Date",
    "systemName": "deploy_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '8': [
  {
    "id": "801",
    "entityTypeId": "8",
    "name": "Endpoint URI Path",
    "systemName": "uri_path",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "802",
    "entityTypeId": "8",
    "name": "HTTP Method",
    "systemName": "http_method",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": false,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "GET",
    "options": {
      "choices": [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH"
      ]
    }
  },
  {
    "id": "803",
    "entityTypeId": "8",
    "name": "Rate Limit (req/sec)",
    "systemName": "rate_limit_rps",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "1000",
    "options": {
      "min": 50,
      "max": 100000
    }
  },
  {
    "id": "804",
    "entityTypeId": "8",
    "name": "Requires JWT Auth",
    "systemName": "jwt_auth_required",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "805",
    "entityTypeId": "8",
    "name": "Last Schema Audit",
    "systemName": "audited_at",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '9': [
  {
    "id": "901",
    "entityTypeId": "9",
    "name": "VPC Alias",
    "systemName": "vpc_alias",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "902",
    "entityTypeId": "9",
    "name": "Network Tier",
    "systemName": "network_tier",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": false,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Standard",
    "options": {
      "choices": [
        "Standard",
        "Dedicated",
        "High-Throughput",
        "Regulated-Gov"
      ]
    }
  },
  {
    "id": "903",
    "entityTypeId": "9",
    "name": "Allocated IP Space",
    "systemName": "allocated_ips",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "4096",
    "options": {
      "min": 256,
      "max": 65536
    }
  },
  {
    "id": "904",
    "entityTypeId": "9",
    "name": "DNS Resolution Enabled",
    "systemName": "dns_resolution",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "905",
    "entityTypeId": "9",
    "name": "Provisioned Date",
    "systemName": "provisioned_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '10': [
  {
    "id": "1001",
    "entityTypeId": "10",
    "name": "Subnet CIDR",
    "systemName": "subnet_cidr",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1002",
    "entityTypeId": "10",
    "name": "Zone Classification",
    "systemName": "zone_classification",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": false,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Private",
    "options": {
      "choices": [
        "Public",
        "Private",
        "Isolated-DB",
        "Transit"
      ]
    }
  },
  {
    "id": "1003",
    "entityTypeId": "10",
    "name": "Available IP Count",
    "systemName": "available_ips",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "250",
    "options": {
      "min": 10,
      "max": 8192
    }
  },
  {
    "id": "1004",
    "entityTypeId": "10",
    "name": "Auto Assign Public IP",
    "systemName": "auto_public_ip",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "false"
  },
  {
    "id": "1005",
    "entityTypeId": "10",
    "name": "Created Date",
    "systemName": "created_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '11': [
  {
    "id": "1101",
    "entityTypeId": "11",
    "name": "Destination CIDR",
    "systemName": "destination_cidr",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1102",
    "entityTypeId": "11",
    "name": "Target Gateway Type",
    "systemName": "gateway_type",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": false,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "InternetGateway",
    "options": {
      "choices": [
        "InternetGateway",
        "NATGateway",
        "TransitGateway",
        "VPCPeering",
        "Blackhole"
      ]
    }
  },
  {
    "id": "1103",
    "entityTypeId": "11",
    "name": "Route Priority Weight",
    "systemName": "priority_weight",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 10,
      "max": 1000
    }
  },
  {
    "id": "1104",
    "entityTypeId": "11",
    "name": "Rule Active",
    "systemName": "is_active",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "1105",
    "entityTypeId": "11",
    "name": "Updated Timestamp",
    "systemName": "updated_timestamp",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '12': [
  {
    "id": "1201",
    "entityTypeId": "12",
    "name": "Group Code",
    "systemName": "group_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1202",
    "entityTypeId": "12",
    "name": "Security Baseline Tier",
    "systemName": "baseline_tier",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": false,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "High",
    "options": {
      "choices": [
        "Permissive",
        "Standard",
        "High",
        "Strict-Lockdown"
      ]
    }
  },
  {
    "id": "1203",
    "entityTypeId": "12",
    "name": "Rule Count",
    "systemName": "rule_count",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "8",
    "options": {
      "min": 1,
      "max": 60
    }
  },
  {
    "id": "1204",
    "entityTypeId": "12",
    "name": "Egress Restricted",
    "systemName": "egress_restricted",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "1205",
    "entityTypeId": "12",
    "name": "Reviewed Date",
    "systemName": "reviewed_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '13': [
  {
    "id": "1301",
    "entityTypeId": "13",
    "name": "Rule Name",
    "systemName": "rule_name",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1302",
    "entityTypeId": "13",
    "name": "Action Directive",
    "systemName": "action_directive",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": false,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "ALLOW",
    "options": {
      "choices": [
        "ALLOW",
        "DENY",
        "CHALLENGE",
        "LOG_ONLY"
      ]
    }
  },
  {
    "id": "1303",
    "entityTypeId": "13",
    "name": "Evaluation Precedence",
    "systemName": "evaluation_precedence",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "500",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "1304",
    "entityTypeId": "13",
    "name": "Packet Logging Enabled",
    "systemName": "packet_logging",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "1305",
    "entityTypeId": "13",
    "name": "Effective Date",
    "systemName": "effective_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '14': [
  {
    "id": "1401",
    "entityTypeId": "14",
    "name": "Network Interface Card Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1402",
    "entityTypeId": "14",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "1403",
    "entityTypeId": "14",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "1404",
    "entityTypeId": "14",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "1405",
    "entityTypeId": "14",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '15': [
  {
    "id": "1501",
    "entityTypeId": "15",
    "name": "Elastic IP Address Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1502",
    "entityTypeId": "15",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "1503",
    "entityTypeId": "15",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "1504",
    "entityTypeId": "15",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "1505",
    "entityTypeId": "15",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '16': [
  {
    "id": "1601",
    "entityTypeId": "16",
    "name": "DNS Hosted Zone Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1602",
    "entityTypeId": "16",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "1603",
    "entityTypeId": "16",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "1604",
    "entityTypeId": "16",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "1605",
    "entityTypeId": "16",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '17': [
  {
    "id": "1701",
    "entityTypeId": "17",
    "name": "DNS Record Entry Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1702",
    "entityTypeId": "17",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "1703",
    "entityTypeId": "17",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "1704",
    "entityTypeId": "17",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "1705",
    "entityTypeId": "17",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '18': [
  {
    "id": "1801",
    "entityTypeId": "18",
    "name": "Application Load Balancer Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1802",
    "entityTypeId": "18",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "1803",
    "entityTypeId": "18",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "1804",
    "entityTypeId": "18",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "1805",
    "entityTypeId": "18",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '19': [
  {
    "id": "1901",
    "entityTypeId": "19",
    "name": "Target Backend Group Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "1902",
    "entityTypeId": "19",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "1903",
    "entityTypeId": "19",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "1904",
    "entityTypeId": "19",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "1905",
    "entityTypeId": "19",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '20': [
  {
    "id": "2001",
    "entityTypeId": "20",
    "name": "SSL/TLS Digital Certificate Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2002",
    "entityTypeId": "20",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "2003",
    "entityTypeId": "20",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2004",
    "entityTypeId": "20",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2005",
    "entityTypeId": "20",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '21': [
  {
    "id": "2101",
    "entityTypeId": "21",
    "name": "WAF Web ACL Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2102",
    "entityTypeId": "21",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "2103",
    "entityTypeId": "21",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2104",
    "entityTypeId": "21",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2105",
    "entityTypeId": "21",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '22': [
  {
    "id": "2201",
    "entityTypeId": "22",
    "name": "DDoS Shield Plan Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2202",
    "entityTypeId": "22",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "2203",
    "entityTypeId": "22",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2204",
    "entityTypeId": "22",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2205",
    "entityTypeId": "22",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '23': [
  {
    "id": "2301",
    "entityTypeId": "23",
    "name": "Block Storage Volume Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2302",
    "entityTypeId": "23",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Available",
    "options": {
      "choices": [
        "Available",
        "In-Use",
        "Snapshotting",
        "Archived",
        "Error"
      ]
    }
  },
  {
    "id": "2303",
    "entityTypeId": "23",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2304",
    "entityTypeId": "23",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2305",
    "entityTypeId": "23",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '24': [
  {
    "id": "2401",
    "entityTypeId": "24",
    "name": "Object Storage Bucket Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2402",
    "entityTypeId": "24",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Available",
    "options": {
      "choices": [
        "Available",
        "In-Use",
        "Snapshotting",
        "Archived",
        "Error"
      ]
    }
  },
  {
    "id": "2403",
    "entityTypeId": "24",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2404",
    "entityTypeId": "24",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2405",
    "entityTypeId": "24",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '25': [
  {
    "id": "2501",
    "entityTypeId": "25",
    "name": "Distributed File System Mount Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2502",
    "entityTypeId": "25",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Available",
    "options": {
      "choices": [
        "Available",
        "In-Use",
        "Snapshotting",
        "Archived",
        "Error"
      ]
    }
  },
  {
    "id": "2503",
    "entityTypeId": "25",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2504",
    "entityTypeId": "25",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2505",
    "entityTypeId": "25",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '26': [
  {
    "id": "2601",
    "entityTypeId": "26",
    "name": "Relational Database Instance Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2602",
    "entityTypeId": "26",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Online",
    "options": {
      "choices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ]
    }
  },
  {
    "id": "2603",
    "entityTypeId": "26",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2604",
    "entityTypeId": "26",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2605",
    "entityTypeId": "26",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '27': [
  {
    "id": "2701",
    "entityTypeId": "27",
    "name": "Database Read Replica Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2702",
    "entityTypeId": "27",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Online",
    "options": {
      "choices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ]
    }
  },
  {
    "id": "2703",
    "entityTypeId": "27",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2704",
    "entityTypeId": "27",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2705",
    "entityTypeId": "27",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '28': [
  {
    "id": "2801",
    "entityTypeId": "28",
    "name": "NoSQL Document Table Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2802",
    "entityTypeId": "28",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Online",
    "options": {
      "choices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ]
    }
  },
  {
    "id": "2803",
    "entityTypeId": "28",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2804",
    "entityTypeId": "28",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2805",
    "entityTypeId": "28",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '29': [
  {
    "id": "2901",
    "entityTypeId": "29",
    "name": "In-Memory Cache Cluster Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "2902",
    "entityTypeId": "29",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Online",
    "options": {
      "choices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ]
    }
  },
  {
    "id": "2903",
    "entityTypeId": "29",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "2904",
    "entityTypeId": "29",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "2905",
    "entityTypeId": "29",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '30': [
  {
    "id": "3001",
    "entityTypeId": "30",
    "name": "Vector Index Namespace Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3002",
    "entityTypeId": "30",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Online",
    "options": {
      "choices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ]
    }
  },
  {
    "id": "3003",
    "entityTypeId": "30",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3004",
    "entityTypeId": "30",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3005",
    "entityTypeId": "30",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '31': [
  {
    "id": "3101",
    "entityTypeId": "31",
    "name": "Message Queue Broker Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3102",
    "entityTypeId": "31",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Healthy",
    "options": {
      "choices": [
        "Healthy",
        "Backpressured",
        "Paused",
        "Overflow",
        "Draining"
      ]
    }
  },
  {
    "id": "3103",
    "entityTypeId": "31",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3104",
    "entityTypeId": "31",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3105",
    "entityTypeId": "31",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '32': [
  {
    "id": "3201",
    "entityTypeId": "32",
    "name": "Event Streaming Stream Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3202",
    "entityTypeId": "32",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Healthy",
    "options": {
      "choices": [
        "Healthy",
        "Backpressured",
        "Paused",
        "Overflow",
        "Draining"
      ]
    }
  },
  {
    "id": "3203",
    "entityTypeId": "32",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3204",
    "entityTypeId": "32",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3205",
    "entityTypeId": "32",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '33': [
  {
    "id": "3301",
    "entityTypeId": "33",
    "name": "Schema Registry Artifact Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3302",
    "entityTypeId": "33",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Healthy",
    "options": {
      "choices": [
        "Healthy",
        "Backpressured",
        "Paused",
        "Overflow",
        "Draining"
      ]
    }
  },
  {
    "id": "3303",
    "entityTypeId": "33",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3304",
    "entityTypeId": "33",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3305",
    "entityTypeId": "33",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '34': [
  {
    "id": "3401",
    "entityTypeId": "34",
    "name": "Data Pipeline Workflow Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3402",
    "entityTypeId": "34",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Succeeded",
    "options": {
      "choices": [
        "Succeeded",
        "Running",
        "Failed",
        "Queued",
        "Retrying"
      ]
    }
  },
  {
    "id": "3403",
    "entityTypeId": "34",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3404",
    "entityTypeId": "34",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3405",
    "entityTypeId": "34",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '35': [
  {
    "id": "3501",
    "entityTypeId": "35",
    "name": "Batch Spark Job Execution Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3502",
    "entityTypeId": "35",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Succeeded",
    "options": {
      "choices": [
        "Succeeded",
        "Running",
        "Failed",
        "Queued",
        "Retrying"
      ]
    }
  },
  {
    "id": "3503",
    "entityTypeId": "35",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3504",
    "entityTypeId": "35",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3505",
    "entityTypeId": "35",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '36': [
  {
    "id": "3601",
    "entityTypeId": "36",
    "name": "Data Lake Lakehouse Catalog Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3602",
    "entityTypeId": "36",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Succeeded",
    "options": {
      "choices": [
        "Succeeded",
        "Running",
        "Failed",
        "Queued",
        "Retrying"
      ]
    }
  },
  {
    "id": "3603",
    "entityTypeId": "36",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3604",
    "entityTypeId": "36",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3605",
    "entityTypeId": "36",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '37': [
  {
    "id": "3701",
    "entityTypeId": "37",
    "name": "Cloud Data Warehouse Warehouse Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3702",
    "entityTypeId": "37",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Succeeded",
    "options": {
      "choices": [
        "Succeeded",
        "Running",
        "Failed",
        "Queued",
        "Retrying"
      ]
    }
  },
  {
    "id": "3703",
    "entityTypeId": "37",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3704",
    "entityTypeId": "37",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3705",
    "entityTypeId": "37",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '38': [
  {
    "id": "3801",
    "entityTypeId": "38",
    "name": "Machine Learning Model Version Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3802",
    "entityTypeId": "38",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Trained",
    "options": {
      "choices": [
        "Trained",
        "Deploying",
        "Serving",
        "Drifted",
        "Archived"
      ]
    }
  },
  {
    "id": "3803",
    "entityTypeId": "38",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3804",
    "entityTypeId": "38",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3805",
    "entityTypeId": "38",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '39': [
  {
    "id": "3901",
    "entityTypeId": "39",
    "name": "Model Training Run Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "3902",
    "entityTypeId": "39",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Trained",
    "options": {
      "choices": [
        "Trained",
        "Deploying",
        "Serving",
        "Drifted",
        "Archived"
      ]
    }
  },
  {
    "id": "3903",
    "entityTypeId": "39",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "3904",
    "entityTypeId": "39",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "3905",
    "entityTypeId": "39",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '40': [
  {
    "id": "4001",
    "entityTypeId": "40",
    "name": "Realtime Inference Endpoint Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4002",
    "entityTypeId": "40",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Trained",
    "options": {
      "choices": [
        "Trained",
        "Deploying",
        "Serving",
        "Drifted",
        "Archived"
      ]
    }
  },
  {
    "id": "4003",
    "entityTypeId": "40",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4004",
    "entityTypeId": "40",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4005",
    "entityTypeId": "40",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '41': [
  {
    "id": "4101",
    "entityTypeId": "41",
    "name": "Feature Store Feature View Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4102",
    "entityTypeId": "41",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Trained",
    "options": {
      "choices": [
        "Trained",
        "Deploying",
        "Serving",
        "Drifted",
        "Archived"
      ]
    }
  },
  {
    "id": "4103",
    "entityTypeId": "41",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4104",
    "entityTypeId": "41",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4105",
    "entityTypeId": "41",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '42': [
  {
    "id": "4201",
    "entityTypeId": "42",
    "name": "SAML/OIDC Identity Provider Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4202",
    "entityTypeId": "42",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Active",
    "options": {
      "choices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ]
    }
  },
  {
    "id": "4203",
    "entityTypeId": "42",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4204",
    "entityTypeId": "42",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4205",
    "entityTypeId": "42",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '43': [
  {
    "id": "4301",
    "entityTypeId": "43",
    "name": "Corporate User Profile Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4302",
    "entityTypeId": "43",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Active",
    "options": {
      "choices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ]
    }
  },
  {
    "id": "4303",
    "entityTypeId": "43",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4304",
    "entityTypeId": "43",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4305",
    "entityTypeId": "43",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '44': [
  {
    "id": "4401",
    "entityTypeId": "44",
    "name": "IAM Role Assignment Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4402",
    "entityTypeId": "44",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Active",
    "options": {
      "choices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ]
    }
  },
  {
    "id": "4403",
    "entityTypeId": "44",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4404",
    "entityTypeId": "44",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4405",
    "entityTypeId": "44",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '45': [
  {
    "id": "4501",
    "entityTypeId": "45",
    "name": "Access Control Privilege Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4502",
    "entityTypeId": "45",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Active",
    "options": {
      "choices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ]
    }
  },
  {
    "id": "4503",
    "entityTypeId": "45",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4504",
    "entityTypeId": "45",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4505",
    "entityTypeId": "45",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '46': [
  {
    "id": "4601",
    "entityTypeId": "46",
    "name": "Automated Service Account Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4602",
    "entityTypeId": "46",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Active",
    "options": {
      "choices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ]
    }
  },
  {
    "id": "4603",
    "entityTypeId": "46",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4604",
    "entityTypeId": "46",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4605",
    "entityTypeId": "46",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '47': [
  {
    "id": "4701",
    "entityTypeId": "47",
    "name": "API Key Credential Token Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4702",
    "entityTypeId": "47",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "4703",
    "entityTypeId": "47",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4704",
    "entityTypeId": "47",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4705",
    "entityTypeId": "47",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '48': [
  {
    "id": "4801",
    "entityTypeId": "48",
    "name": "Secrets Manager Vault Secret Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4802",
    "entityTypeId": "48",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "4803",
    "entityTypeId": "48",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4804",
    "entityTypeId": "48",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4805",
    "entityTypeId": "48",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '49': [
  {
    "id": "4901",
    "entityTypeId": "49",
    "name": "KMS Customer Master Key Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "4902",
    "entityTypeId": "49",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "4903",
    "entityTypeId": "49",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "4904",
    "entityTypeId": "49",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "4905",
    "entityTypeId": "49",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '50': [
  {
    "id": "5001",
    "entityTypeId": "50",
    "name": "Immutable Audit Log Pipe Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5002",
    "entityTypeId": "50",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "5003",
    "entityTypeId": "50",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5004",
    "entityTypeId": "50",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5005",
    "entityTypeId": "50",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '51': [
  {
    "id": "5101",
    "entityTypeId": "51",
    "name": "SIEM Incident Detection Rule Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5102",
    "entityTypeId": "51",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "5103",
    "entityTypeId": "51",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5104",
    "entityTypeId": "51",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5105",
    "entityTypeId": "51",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '52': [
  {
    "id": "5201",
    "entityTypeId": "52",
    "name": "Vulnerability CVE Finding Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5202",
    "entityTypeId": "52",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "5203",
    "entityTypeId": "52",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5204",
    "entityTypeId": "52",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5205",
    "entityTypeId": "52",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '53': [
  {
    "id": "5301",
    "entityTypeId": "53",
    "name": "Container SBOM Scan Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5302",
    "entityTypeId": "53",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "5303",
    "entityTypeId": "53",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5304",
    "entityTypeId": "53",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5305",
    "entityTypeId": "53",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '54': [
  {
    "id": "5401",
    "entityTypeId": "54",
    "name": "Compliance Benchmark Audit Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5402",
    "entityTypeId": "54",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Certified",
    "options": {
      "choices": [
        "Certified",
        "Under-Review",
        "Remediation-Needed",
        "Audited",
        "Exempt"
      ]
    }
  },
  {
    "id": "5403",
    "entityTypeId": "54",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5404",
    "entityTypeId": "54",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5405",
    "entityTypeId": "54",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '55': [
  {
    "id": "5501",
    "entityTypeId": "55",
    "name": "Production Incident Ticket Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5502",
    "entityTypeId": "55",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Open",
    "options": {
      "choices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ]
    }
  },
  {
    "id": "5503",
    "entityTypeId": "55",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5504",
    "entityTypeId": "55",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5505",
    "entityTypeId": "55",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '56': [
  {
    "id": "5601",
    "entityTypeId": "56",
    "name": "On-Call Pager Schedule Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5602",
    "entityTypeId": "56",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Open",
    "options": {
      "choices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ]
    }
  },
  {
    "id": "5603",
    "entityTypeId": "56",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5604",
    "entityTypeId": "56",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5605",
    "entityTypeId": "56",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '57': [
  {
    "id": "5701",
    "entityTypeId": "57",
    "name": "Escalation Alert Notification Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5702",
    "entityTypeId": "57",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Open",
    "options": {
      "choices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ]
    }
  },
  {
    "id": "5703",
    "entityTypeId": "57",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5704",
    "entityTypeId": "57",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5705",
    "entityTypeId": "57",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '58': [
  {
    "id": "5801",
    "entityTypeId": "58",
    "name": "Prometheus Metric Alert Rule Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5802",
    "entityTypeId": "58",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Firing",
    "options": {
      "choices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ]
    }
  },
  {
    "id": "5803",
    "entityTypeId": "58",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5804",
    "entityTypeId": "58",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5805",
    "entityTypeId": "58",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '59': [
  {
    "id": "5901",
    "entityTypeId": "59",
    "name": "Synthetic Ping Probe Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "5902",
    "entityTypeId": "59",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Firing",
    "options": {
      "choices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ]
    }
  },
  {
    "id": "5903",
    "entityTypeId": "59",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "5904",
    "entityTypeId": "59",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "5905",
    "entityTypeId": "59",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '60': [
  {
    "id": "6001",
    "entityTypeId": "60",
    "name": "Log Index Query Saved Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6002",
    "entityTypeId": "60",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Firing",
    "options": {
      "choices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ]
    }
  },
  {
    "id": "6003",
    "entityTypeId": "60",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6004",
    "entityTypeId": "60",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6005",
    "entityTypeId": "60",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '61': [
  {
    "id": "6101",
    "entityTypeId": "61",
    "name": "OpenTelemetry Trace Span Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6102",
    "entityTypeId": "61",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Firing",
    "options": {
      "choices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ]
    }
  },
  {
    "id": "6103",
    "entityTypeId": "61",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6104",
    "entityTypeId": "61",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6105",
    "entityTypeId": "61",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '62': [
  {
    "id": "6201",
    "entityTypeId": "62",
    "name": "APM Microservice Health Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6202",
    "entityTypeId": "62",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Firing",
    "options": {
      "choices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ]
    }
  },
  {
    "id": "6203",
    "entityTypeId": "62",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6204",
    "entityTypeId": "62",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6205",
    "entityTypeId": "62",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '63': [
  {
    "id": "6301",
    "entityTypeId": "63",
    "name": "Synthetic Health Check Ping Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6302",
    "entityTypeId": "63",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Firing",
    "options": {
      "choices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ]
    }
  },
  {
    "id": "6303",
    "entityTypeId": "63",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6304",
    "entityTypeId": "63",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6305",
    "entityTypeId": "63",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '64': [
  {
    "id": "6401",
    "entityTypeId": "64",
    "name": "Service Level Objective (SLO) Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6402",
    "entityTypeId": "64",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Open",
    "options": {
      "choices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ]
    }
  },
  {
    "id": "6403",
    "entityTypeId": "64",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6404",
    "entityTypeId": "64",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6405",
    "entityTypeId": "64",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '65': [
  {
    "id": "6501",
    "entityTypeId": "65",
    "name": "Customer Facing Status Page Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6502",
    "entityTypeId": "65",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Open",
    "options": {
      "choices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ]
    }
  },
  {
    "id": "6503",
    "entityTypeId": "65",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6504",
    "entityTypeId": "65",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6505",
    "entityTypeId": "65",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '66': [
  {
    "id": "6601",
    "entityTypeId": "66",
    "name": "Cost Allocation FinOps Tag Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6602",
    "entityTypeId": "66",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Approved",
    "options": {
      "choices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ]
    }
  },
  {
    "id": "6603",
    "entityTypeId": "66",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6604",
    "entityTypeId": "66",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6605",
    "entityTypeId": "66",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '67': [
  {
    "id": "6701",
    "entityTypeId": "67",
    "name": "Cloud Monthly Budget Plan Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6702",
    "entityTypeId": "67",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Approved",
    "options": {
      "choices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ]
    }
  },
  {
    "id": "6703",
    "entityTypeId": "67",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6704",
    "entityTypeId": "67",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6705",
    "entityTypeId": "67",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '68': [
  {
    "id": "6801",
    "entityTypeId": "68",
    "name": "FinOps Cost Spike Anomaly Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6802",
    "entityTypeId": "68",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Approved",
    "options": {
      "choices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ]
    }
  },
  {
    "id": "6803",
    "entityTypeId": "68",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6804",
    "entityTypeId": "68",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6805",
    "entityTypeId": "68",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '69': [
  {
    "id": "6901",
    "entityTypeId": "69",
    "name": "Reserved Instance Commitment Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "6902",
    "entityTypeId": "69",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Approved",
    "options": {
      "choices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ]
    }
  },
  {
    "id": "6903",
    "entityTypeId": "69",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "6904",
    "entityTypeId": "69",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "6905",
    "entityTypeId": "69",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '70': [
  {
    "id": "7001",
    "entityTypeId": "70",
    "name": "Savings Plan Contract Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7002",
    "entityTypeId": "70",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Approved",
    "options": {
      "choices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ]
    }
  },
  {
    "id": "7003",
    "entityTypeId": "70",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7004",
    "entityTypeId": "70",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7005",
    "entityTypeId": "70",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '71': [
  {
    "id": "7101",
    "entityTypeId": "71",
    "name": "Cloud Provider Invoice Statement Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7102",
    "entityTypeId": "71",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Approved",
    "options": {
      "choices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ]
    }
  },
  {
    "id": "7103",
    "entityTypeId": "71",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7104",
    "entityTypeId": "71",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7105",
    "entityTypeId": "71",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '72': [
  {
    "id": "7201",
    "entityTypeId": "72",
    "name": "Credit Card Billing Profile Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7202",
    "entityTypeId": "72",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Approved",
    "options": {
      "choices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ]
    }
  },
  {
    "id": "7203",
    "entityTypeId": "72",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7204",
    "entityTypeId": "72",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7205",
    "entityTypeId": "72",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '73': [
  {
    "id": "7301",
    "entityTypeId": "73",
    "name": "CI/CD Pipeline Flow Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7302",
    "entityTypeId": "73",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Passed",
    "options": {
      "choices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ]
    }
  },
  {
    "id": "7303",
    "entityTypeId": "73",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7304",
    "entityTypeId": "73",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7305",
    "entityTypeId": "73",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '74': [
  {
    "id": "7401",
    "entityTypeId": "74",
    "name": "Software Build Artifact Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7402",
    "entityTypeId": "74",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Passed",
    "options": {
      "choices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ]
    }
  },
  {
    "id": "7403",
    "entityTypeId": "74",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7404",
    "entityTypeId": "74",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7405",
    "entityTypeId": "74",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '75': [
  {
    "id": "7501",
    "entityTypeId": "75",
    "name": "Git Source Repository Webhook Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7502",
    "entityTypeId": "75",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Passed",
    "options": {
      "choices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ]
    }
  },
  {
    "id": "7503",
    "entityTypeId": "75",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7504",
    "entityTypeId": "75",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7505",
    "entityTypeId": "75",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '76': [
  {
    "id": "7601",
    "entityTypeId": "76",
    "name": "Deployment Target Environment Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7602",
    "entityTypeId": "76",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Passed",
    "options": {
      "choices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ]
    }
  },
  {
    "id": "7603",
    "entityTypeId": "76",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7604",
    "entityTypeId": "76",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7605",
    "entityTypeId": "76",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '77': [
  {
    "id": "7701",
    "entityTypeId": "77",
    "name": "Terraform IaC Stack Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7702",
    "entityTypeId": "77",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Passed",
    "options": {
      "choices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ]
    }
  },
  {
    "id": "7703",
    "entityTypeId": "77",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7704",
    "entityTypeId": "77",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7705",
    "entityTypeId": "77",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '78': [
  {
    "id": "7801",
    "entityTypeId": "78",
    "name": "Distributed Statefile Lock Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7802",
    "entityTypeId": "78",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Passed",
    "options": {
      "choices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ]
    }
  },
  {
    "id": "7803",
    "entityTypeId": "78",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7804",
    "entityTypeId": "78",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7805",
    "entityTypeId": "78",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '79': [
  {
    "id": "7901",
    "entityTypeId": "79",
    "name": "Private Container Registry Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "7902",
    "entityTypeId": "79",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Passed",
    "options": {
      "choices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ]
    }
  },
  {
    "id": "7903",
    "entityTypeId": "79",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "7904",
    "entityTypeId": "79",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "7905",
    "entityTypeId": "79",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '80': [
  {
    "id": "8001",
    "entityTypeId": "80",
    "name": "Helm Chart Deployment Release Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8002",
    "entityTypeId": "80",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Passed",
    "options": {
      "choices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ]
    }
  },
  {
    "id": "8003",
    "entityTypeId": "80",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8004",
    "entityTypeId": "80",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8005",
    "entityTypeId": "80",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '81': [
  {
    "id": "8101",
    "entityTypeId": "81",
    "name": "Istio Service Mesh Gateway Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8102",
    "entityTypeId": "81",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "8103",
    "entityTypeId": "81",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8104",
    "entityTypeId": "81",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8105",
    "entityTypeId": "81",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '82': [
  {
    "id": "8201",
    "entityTypeId": "82",
    "name": "Ingress Controller Route Map Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8202",
    "entityTypeId": "82",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "8203",
    "entityTypeId": "82",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8204",
    "entityTypeId": "82",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8205",
    "entityTypeId": "82",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '83': [
  {
    "id": "8301",
    "entityTypeId": "83",
    "name": "Envoy Filter Plugin Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8302",
    "entityTypeId": "83",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "8303",
    "entityTypeId": "83",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8304",
    "entityTypeId": "83",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8305",
    "entityTypeId": "83",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '84': [
  {
    "id": "8401",
    "entityTypeId": "84",
    "name": "Mutual TLS Mutual Certificate Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8402",
    "entityTypeId": "84",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Compliant",
    "options": {
      "choices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ]
    }
  },
  {
    "id": "8403",
    "entityTypeId": "84",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8404",
    "entityTypeId": "84",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8405",
    "entityTypeId": "84",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '85': [
  {
    "id": "8501",
    "entityTypeId": "85",
    "name": "Cross-Cloud Network Peering Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8502",
    "entityTypeId": "85",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "8503",
    "entityTypeId": "85",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8504",
    "entityTypeId": "85",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8505",
    "entityTypeId": "85",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '86': [
  {
    "id": "8601",
    "entityTypeId": "86",
    "name": "Transit Gateway Attachment Link Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8602",
    "entityTypeId": "86",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "8603",
    "entityTypeId": "86",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8604",
    "entityTypeId": "86",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8605",
    "entityTypeId": "86",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '87': [
  {
    "id": "8701",
    "entityTypeId": "87",
    "name": "IPSec VPN Tunnel Gateway Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8702",
    "entityTypeId": "87",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "8703",
    "entityTypeId": "87",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8704",
    "entityTypeId": "87",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8705",
    "entityTypeId": "87",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '88': [
  {
    "id": "8801",
    "entityTypeId": "88",
    "name": "Direct Cloud Interconnect Circuit Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8802",
    "entityTypeId": "88",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "8803",
    "entityTypeId": "88",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8804",
    "entityTypeId": "88",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8805",
    "entityTypeId": "88",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '89': [
  {
    "id": "8901",
    "entityTypeId": "89",
    "name": "High-Throughput NAT Router Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "8902",
    "entityTypeId": "89",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "8903",
    "entityTypeId": "89",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "8904",
    "entityTypeId": "89",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "8905",
    "entityTypeId": "89",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '90': [
  {
    "id": "9001",
    "entityTypeId": "90",
    "name": "Cloud CDN Global Distribution Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9002",
    "entityTypeId": "90",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Provisioned",
    "options": {
      "choices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ]
    }
  },
  {
    "id": "9003",
    "entityTypeId": "90",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9004",
    "entityTypeId": "90",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9005",
    "entityTypeId": "90",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '91': [
  {
    "id": "9101",
    "entityTypeId": "91",
    "name": "Edge Worker Compute Lambda Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9102",
    "entityTypeId": "91",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Running",
    "options": {
      "choices": [
        "Running",
        "Stopped",
        "Scaling",
        "Spot-Interrupted",
        "Terminating"
      ]
    }
  },
  {
    "id": "9103",
    "entityTypeId": "91",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9104",
    "entityTypeId": "91",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9105",
    "entityTypeId": "91",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '92': [
  {
    "id": "9201",
    "entityTypeId": "92",
    "name": "WebSocket Long-Lived Session Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9202",
    "entityTypeId": "92",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Healthy",
    "options": {
      "choices": [
        "Healthy",
        "Backpressured",
        "Paused",
        "Overflow",
        "Draining"
      ]
    }
  },
  {
    "id": "9203",
    "entityTypeId": "92",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9204",
    "entityTypeId": "92",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9205",
    "entityTypeId": "92",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '93': [
  {
    "id": "9301",
    "entityTypeId": "93",
    "name": "Inbound Webhook Receiver Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9302",
    "entityTypeId": "93",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Active",
    "options": {
      "choices": [
        "Active",
        "Rate-Throttled",
        "Disabled",
        "Circuit-Broken",
        "Pending"
      ]
    }
  },
  {
    "id": "9303",
    "entityTypeId": "93",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9304",
    "entityTypeId": "93",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9305",
    "entityTypeId": "93",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '94': [
  {
    "id": "9401",
    "entityTypeId": "94",
    "name": "Mobile Push Notification Channel Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9402",
    "entityTypeId": "94",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Active",
    "options": {
      "choices": [
        "Active",
        "Rate-Throttled",
        "Disabled",
        "Circuit-Broken",
        "Pending"
      ]
    }
  },
  {
    "id": "9403",
    "entityTypeId": "94",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9404",
    "entityTypeId": "94",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9405",
    "entityTypeId": "94",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '95': [
  {
    "id": "9501",
    "entityTypeId": "95",
    "name": "Transactional Email Template Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9502",
    "entityTypeId": "95",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Active",
    "options": {
      "choices": [
        "Active",
        "Rate-Throttled",
        "Disabled",
        "Circuit-Broken",
        "Pending"
      ]
    }
  },
  {
    "id": "9503",
    "entityTypeId": "95",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9504",
    "entityTypeId": "95",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9505",
    "entityTypeId": "95",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '96': [
  {
    "id": "9601",
    "entityTypeId": "96",
    "name": "SMS Carrier Outbound Campaign Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9602",
    "entityTypeId": "96",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Active",
    "options": {
      "choices": [
        "Active",
        "Rate-Throttled",
        "Disabled",
        "Circuit-Broken",
        "Pending"
      ]
    }
  },
  {
    "id": "9603",
    "entityTypeId": "96",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9604",
    "entityTypeId": "96",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9605",
    "entityTypeId": "96",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '97': [
  {
    "id": "9701",
    "entityTypeId": "97",
    "name": "IoT Edge Device Registry Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9702",
    "entityTypeId": "97",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Connected",
    "options": {
      "choices": [
        "Connected",
        "Offline",
        "Firmware-Updating",
        "Alerting",
        "Decommissioned"
      ]
    }
  },
  {
    "id": "9703",
    "entityTypeId": "97",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9704",
    "entityTypeId": "97",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9705",
    "entityTypeId": "97",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '98': [
  {
    "id": "9801",
    "entityTypeId": "98",
    "name": "IoT High-Frequency Telemetry Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9802",
    "entityTypeId": "98",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Connected",
    "options": {
      "choices": [
        "Connected",
        "Offline",
        "Firmware-Updating",
        "Alerting",
        "Decommissioned"
      ]
    }
  },
  {
    "id": "9803",
    "entityTypeId": "98",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9804",
    "entityTypeId": "98",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9805",
    "entityTypeId": "98",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '99': [
  {
    "id": "9901",
    "entityTypeId": "99",
    "name": "IoT Twin Device Shadow Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "9902",
    "entityTypeId": "99",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Connected",
    "options": {
      "choices": [
        "Connected",
        "Offline",
        "Firmware-Updating",
        "Alerting",
        "Decommissioned"
      ]
    }
  },
  {
    "id": "9903",
    "entityTypeId": "99",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "9904",
    "entityTypeId": "99",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "9905",
    "entityTypeId": "99",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '100': [
  {
    "id": "10001",
    "entityTypeId": "100",
    "name": "Edge Gateway Firmware Patch Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "10002",
    "entityTypeId": "100",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Connected",
    "options": {
      "choices": [
        "Connected",
        "Offline",
        "Firmware-Updating",
        "Alerting",
        "Decommissioned"
      ]
    }
  },
  {
    "id": "10003",
    "entityTypeId": "100",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "10004",
    "entityTypeId": "100",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "10005",
    "entityTypeId": "100",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
  '101': [
  {
    "id": "10101",
    "entityTypeId": "101",
    "name": "Disaster Recovery Snapshot Job Code",
    "systemName": "item_code",
    "dataType": "STRING",
    "uiComponent": "text",
    "isRequired": true,
    "displayOrder": 1,
    "version": 1
  },
  {
    "id": "10102",
    "entityTypeId": "101",
    "name": "Operational State",
    "systemName": "operational_state",
    "dataType": "STRING",
    "uiComponent": "select",
    "isRequired": true,
    "displayOrder": 2,
    "version": 1,
    "defaultValue": "Available",
    "options": {
      "choices": [
        "Available",
        "In-Use",
        "Snapshotting",
        "Archived",
        "Error"
      ]
    }
  },
  {
    "id": "10103",
    "entityTypeId": "101",
    "name": "Capacity Metric Quota",
    "systemName": "metric_quota",
    "dataType": "INTEGER",
    "uiComponent": "number",
    "isRequired": false,
    "displayOrder": 3,
    "version": 1,
    "defaultValue": "100",
    "options": {
      "min": 1,
      "max": 10000
    }
  },
  {
    "id": "10104",
    "entityTypeId": "101",
    "name": "High Availability Flag",
    "systemName": "is_high_availability",
    "dataType": "BOOLEAN",
    "uiComponent": "switch",
    "isRequired": false,
    "displayOrder": 4,
    "version": 1,
    "defaultValue": "true"
  },
  {
    "id": "10105",
    "entityTypeId": "101",
    "name": "Registration Date",
    "systemName": "registered_date",
    "dataType": "DATE",
    "uiComponent": "datepicker",
    "isRequired": false,
    "displayOrder": 5,
    "version": 1
  }
],
};


const regions = [
  'tenant-us-east-1',
  'tenant-us-west-2',
  'tenant-eu-central-1',
  'tenant-eu-west-1',
  'tenant-ap-southeast-1',
  'tenant-ap-northeast-1',
];

const modelMetaById: Record<string, any> = {
  "4": {
    "recordTemplates": {
      "namePrefixes": [
        "prod-api-worker",
        "stage-cache-node",
        "ingest-stream-host",
        "ml-eval-runner",
        "batch-etl-pod"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "foxtrot"
      ],
      "statusChoices": [
        "Running",
        "Stopped",
        "Provisioning",
        "Terminated",
        "Suspended"
      ],
      "metricRange": [
        5,
        95
      ],
      "booleanLabel": "termination_protection"
    },
    "attrs": [
      "instance_id",
      "lifecycle_status",
      "cpu_utilization",
      "termination_protection",
      "launched_at"
    ]
  },
  "5": {
    "recordTemplates": {
      "namePrefixes": [
        "core-platform",
        "data-mesh",
        "edge-gateway",
        "payment-processor",
        "tenant-isolated"
      ],
      "nameSuffixes": [
        "primary",
        "secondary",
        "dr-site",
        "blue",
        "green"
      ],
      "statusChoices": [
        "v1.28.6",
        "v1.29.2",
        "v1.30.1",
        "v1.31.0"
      ],
      "metricRange": [
        3,
        120
      ],
      "booleanLabel": "autopilot_enabled"
    },
    "attrs": [
      "cluster_name",
      "engine_version",
      "node_count",
      "autopilot_enabled",
      "created_date"
    ]
  },
  "6": {
    "recordTemplates": {
      "namePrefixes": [
        "services/auth-service",
        "frontend/web-console",
        "infra/sidecar-proxy",
        "data/spark-job",
        "ai/rag-inference"
      ],
      "nameSuffixes": [
        "v1.2",
        "v2.0",
        "nightly",
        "rc-3",
        "stable"
      ],
      "statusChoices": [
        "Public",
        "Private",
        "Internal",
        "Restricted"
      ],
      "metricRange": [
        1,
        250
      ],
      "booleanLabel": "scan_on_push"
    },
    "attrs": [
      "repo_path",
      "access_tier",
      "digest_count",
      "scan_on_push",
      "last_push_at"
    ]
  },
  "7": {
    "recordTemplates": {
      "namePrefixes": [
        "fn-auth-hook",
        "fn-thumbnail-generator",
        "fn-stripe-webhook",
        "fn-audit-dispatcher",
        "fn-telemetry-ingest"
      ],
      "nameSuffixes": [
        "v1",
        "v2",
        "canary",
        "prod",
        "staging"
      ],
      "statusChoices": [
        "NodeJS 20",
        "Python 3.12",
        "Go 1.22",
        "Java 21",
        "Rust 1.78"
      ],
      "metricRange": [
        256,
        4096
      ],
      "booleanLabel": "warm_pool_enabled"
    },
    "attrs": [
      "function_name",
      "runtime_platform",
      "memory_mb",
      "warm_pool_enabled",
      "deploy_date"
    ]
  },
  "8": {
    "recordTemplates": {
      "namePrefixes": [
        "/api/v1/orders",
        "/api/v1/customers",
        "/api/v2/telemetry",
        "/api/v1/billing",
        "/api/v3/auth"
      ],
      "nameSuffixes": [
        "/{id}",
        "/search",
        "/export",
        "/bulk",
        "/status"
      ],
      "statusChoices": [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH"
      ],
      "metricRange": [
        100,
        5000
      ],
      "booleanLabel": "jwt_auth_required"
    },
    "attrs": [
      "uri_path",
      "http_method",
      "rate_limit_rps",
      "jwt_auth_required",
      "audited_at"
    ]
  },
  "9": {
    "recordTemplates": {
      "namePrefixes": [
        "vpc-us-east-prod",
        "vpc-eu-west-pci",
        "vpc-apac-transit",
        "vpc-stage-shared",
        "vpc-dev-sandbox"
      ],
      "nameSuffixes": [
        "net-a",
        "net-b",
        "net-c",
        "corp",
        "partner"
      ],
      "statusChoices": [
        "Standard",
        "Dedicated",
        "High-Throughput",
        "Regulated-Gov"
      ],
      "metricRange": [
        512,
        16384
      ],
      "booleanLabel": "dns_resolution"
    },
    "attrs": [
      "vpc_alias",
      "network_tier",
      "allocated_ips",
      "dns_resolution",
      "provisioned_date"
    ]
  },
  "10": {
    "recordTemplates": {
      "namePrefixes": [
        "10.100.1.0/24",
        "10.100.2.0/24",
        "10.200.4.0/23",
        "172.16.8.0/22",
        "192.168.10.0/24"
      ],
      "nameSuffixes": [
        "az-1a",
        "az-1b",
        "az-1c",
        "az-2a",
        "az-2b"
      ],
      "statusChoices": [
        "Public",
        "Private",
        "Isolated-DB",
        "Transit"
      ],
      "metricRange": [
        30,
        2048
      ],
      "booleanLabel": "auto_public_ip"
    },
    "attrs": [
      "subnet_cidr",
      "zone_classification",
      "available_ips",
      "auto_public_ip",
      "created_date"
    ]
  },
  "11": {
    "recordTemplates": {
      "namePrefixes": [
        "0.0.0.0/0",
        "10.0.0.0/8",
        "172.16.0.0/12",
        "192.168.0.0/16",
        "100.64.0.0/10"
      ],
      "nameSuffixes": [
        "igw-main",
        "nat-az1",
        "tgw-corp",
        "peer-prod",
        "drop-sink"
      ],
      "statusChoices": [
        "InternetGateway",
        "NATGateway",
        "TransitGateway",
        "VPCPeering",
        "Blackhole"
      ],
      "metricRange": [
        100,
        900
      ],
      "booleanLabel": "is_active"
    },
    "attrs": [
      "destination_cidr",
      "gateway_type",
      "priority_weight",
      "is_active",
      "updated_timestamp"
    ]
  },
  "12": {
    "recordTemplates": {
      "namePrefixes": [
        "sg-web-alb",
        "sg-k8s-nodes",
        "sg-postgres-cluster",
        "sg-redis-cache",
        "sg-bastion-ssh"
      ],
      "nameSuffixes": [
        "zone1",
        "corp",
        "pci-tier",
        "external",
        "internal"
      ],
      "statusChoices": [
        "Permissive",
        "Standard",
        "High",
        "Strict-Lockdown"
      ],
      "metricRange": [
        2,
        45
      ],
      "booleanLabel": "egress_restricted"
    },
    "attrs": [
      "group_code",
      "baseline_tier",
      "rule_count",
      "egress_restricted",
      "reviewed_date"
    ]
  },
  "13": {
    "recordTemplates": {
      "namePrefixes": [
        "fw-block-tor-nodes",
        "fw-allow-cloudflare-ips",
        "fw-rate-limit-syn",
        "fw-deny-rfc1918-egress",
        "fw-geo-fence-asia"
      ],
      "nameSuffixes": [
        "v1",
        "policy-a",
        "override",
        "audit",
        "enforced"
      ],
      "statusChoices": [
        "ALLOW",
        "DENY",
        "CHALLENGE",
        "LOG_ONLY"
      ],
      "metricRange": [
        100,
        9999
      ],
      "booleanLabel": "packet_logging"
    },
    "attrs": [
      "rule_name",
      "action_directive",
      "evaluation_precedence",
      "packet_logging",
      "effective_date"
    ]
  },
  "14": {
    "recordTemplates": {
      "namePrefixes": [
        "network_interface-prod",
        "network_interface-stg",
        "network_interface-corp",
        "network_interface-dr",
        "network_interface-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "15": {
    "recordTemplates": {
      "namePrefixes": [
        "elastic_ip_address-prod",
        "elastic_ip_address-stg",
        "elastic_ip_address-corp",
        "elastic_ip_address-dr",
        "elastic_ip_address-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "16": {
    "recordTemplates": {
      "namePrefixes": [
        "dns_hosted_zone-prod",
        "dns_hosted_zone-stg",
        "dns_hosted_zone-corp",
        "dns_hosted_zone-dr",
        "dns_hosted_zone-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "17": {
    "recordTemplates": {
      "namePrefixes": [
        "dns_record_entry-prod",
        "dns_record_entry-stg",
        "dns_record_entry-corp",
        "dns_record_entry-dr",
        "dns_record_entry-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "18": {
    "recordTemplates": {
      "namePrefixes": [
        "app_load_balancer-prod",
        "app_load_balancer-stg",
        "app_load_balancer-corp",
        "app_load_balancer-dr",
        "app_load_balancer-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "19": {
    "recordTemplates": {
      "namePrefixes": [
        "target_backend_group-prod",
        "target_backend_group-stg",
        "target_backend_group-corp",
        "target_backend_group-dr",
        "target_backend_group-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "20": {
    "recordTemplates": {
      "namePrefixes": [
        "tls_certificate-prod",
        "tls_certificate-stg",
        "tls_certificate-corp",
        "tls_certificate-dr",
        "tls_certificate-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "21": {
    "recordTemplates": {
      "namePrefixes": [
        "waf_web_acl-prod",
        "waf_web_acl-stg",
        "waf_web_acl-corp",
        "waf_web_acl-dr",
        "waf_web_acl-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "22": {
    "recordTemplates": {
      "namePrefixes": [
        "ddos_shield_plan-prod",
        "ddos_shield_plan-stg",
        "ddos_shield_plan-corp",
        "ddos_shield_plan-dr",
        "ddos_shield_plan-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "23": {
    "recordTemplates": {
      "namePrefixes": [
        "block_storage_volume-prod",
        "block_storage_volume-stg",
        "block_storage_volume-corp",
        "block_storage_volume-dr",
        "block_storage_volume-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Available",
        "In-Use",
        "Snapshotting",
        "Archived",
        "Error"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "24": {
    "recordTemplates": {
      "namePrefixes": [
        "object_storage_bucket-prod",
        "object_storage_bucket-stg",
        "object_storage_bucket-corp",
        "object_storage_bucket-dr",
        "object_storage_bucket-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Available",
        "In-Use",
        "Snapshotting",
        "Archived",
        "Error"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "25": {
    "recordTemplates": {
      "namePrefixes": [
        "distributed_fs_mount-prod",
        "distributed_fs_mount-stg",
        "distributed_fs_mount-corp",
        "distributed_fs_mount-dr",
        "distributed_fs_mount-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Available",
        "In-Use",
        "Snapshotting",
        "Archived",
        "Error"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "26": {
    "recordTemplates": {
      "namePrefixes": [
        "relational_db_instance-prod",
        "relational_db_instance-stg",
        "relational_db_instance-corp",
        "relational_db_instance-dr",
        "relational_db_instance-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "27": {
    "recordTemplates": {
      "namePrefixes": [
        "db_read_replica-prod",
        "db_read_replica-stg",
        "db_read_replica-corp",
        "db_read_replica-dr",
        "db_read_replica-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "28": {
    "recordTemplates": {
      "namePrefixes": [
        "nosql_doc_table-prod",
        "nosql_doc_table-stg",
        "nosql_doc_table-corp",
        "nosql_doc_table-dr",
        "nosql_doc_table-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "29": {
    "recordTemplates": {
      "namePrefixes": [
        "in_memory_cache-prod",
        "in_memory_cache-stg",
        "in_memory_cache-corp",
        "in_memory_cache-dr",
        "in_memory_cache-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "30": {
    "recordTemplates": {
      "namePrefixes": [
        "vector_index_namespace-prod",
        "vector_index_namespace-stg",
        "vector_index_namespace-corp",
        "vector_index_namespace-dr",
        "vector_index_namespace-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Online",
        "Failover-Pending",
        "Backing-Up",
        "Maintenance",
        "Stopping"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "31": {
    "recordTemplates": {
      "namePrefixes": [
        "message_queue_broker-prod",
        "message_queue_broker-stg",
        "message_queue_broker-corp",
        "message_queue_broker-dr",
        "message_queue_broker-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Healthy",
        "Backpressured",
        "Paused",
        "Overflow",
        "Draining"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "32": {
    "recordTemplates": {
      "namePrefixes": [
        "event_streaming_topic-prod",
        "event_streaming_topic-stg",
        "event_streaming_topic-corp",
        "event_streaming_topic-dr",
        "event_streaming_topic-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Healthy",
        "Backpressured",
        "Paused",
        "Overflow",
        "Draining"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "33": {
    "recordTemplates": {
      "namePrefixes": [
        "schema_registry_artifact-prod",
        "schema_registry_artifact-stg",
        "schema_registry_artifact-corp",
        "schema_registry_artifact-dr",
        "schema_registry_artifact-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Healthy",
        "Backpressured",
        "Paused",
        "Overflow",
        "Draining"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "34": {
    "recordTemplates": {
      "namePrefixes": [
        "data_pipeline_workflow-prod",
        "data_pipeline_workflow-stg",
        "data_pipeline_workflow-corp",
        "data_pipeline_workflow-dr",
        "data_pipeline_workflow-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Succeeded",
        "Running",
        "Failed",
        "Queued",
        "Retrying"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "35": {
    "recordTemplates": {
      "namePrefixes": [
        "spark_job_execution-prod",
        "spark_job_execution-stg",
        "spark_job_execution-corp",
        "spark_job_execution-dr",
        "spark_job_execution-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Succeeded",
        "Running",
        "Failed",
        "Queued",
        "Retrying"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "36": {
    "recordTemplates": {
      "namePrefixes": [
        "lakehouse_catalog-prod",
        "lakehouse_catalog-stg",
        "lakehouse_catalog-corp",
        "lakehouse_catalog-dr",
        "lakehouse_catalog-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Succeeded",
        "Running",
        "Failed",
        "Queued",
        "Retrying"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "37": {
    "recordTemplates": {
      "namePrefixes": [
        "data_warehouse_warehouse-prod",
        "data_warehouse_warehouse-stg",
        "data_warehouse_warehouse-corp",
        "data_warehouse_warehouse-dr",
        "data_warehouse_warehouse-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Succeeded",
        "Running",
        "Failed",
        "Queued",
        "Retrying"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "38": {
    "recordTemplates": {
      "namePrefixes": [
        "ml_model_version-prod",
        "ml_model_version-stg",
        "ml_model_version-corp",
        "ml_model_version-dr",
        "ml_model_version-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Trained",
        "Deploying",
        "Serving",
        "Drifted",
        "Archived"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "39": {
    "recordTemplates": {
      "namePrefixes": [
        "ml_training_run-prod",
        "ml_training_run-stg",
        "ml_training_run-corp",
        "ml_training_run-dr",
        "ml_training_run-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Trained",
        "Deploying",
        "Serving",
        "Drifted",
        "Archived"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "40": {
    "recordTemplates": {
      "namePrefixes": [
        "inference_endpoint-prod",
        "inference_endpoint-stg",
        "inference_endpoint-corp",
        "inference_endpoint-dr",
        "inference_endpoint-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Trained",
        "Deploying",
        "Serving",
        "Drifted",
        "Archived"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "41": {
    "recordTemplates": {
      "namePrefixes": [
        "feature_store_view-prod",
        "feature_store_view-stg",
        "feature_store_view-corp",
        "feature_store_view-dr",
        "feature_store_view-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Trained",
        "Deploying",
        "Serving",
        "Drifted",
        "Archived"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "42": {
    "recordTemplates": {
      "namePrefixes": [
        "saml_identity_provider-prod",
        "saml_identity_provider-stg",
        "saml_identity_provider-corp",
        "saml_identity_provider-dr",
        "saml_identity_provider-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "43": {
    "recordTemplates": {
      "namePrefixes": [
        "corporate_user_profile-prod",
        "corporate_user_profile-stg",
        "corporate_user_profile-corp",
        "corporate_user_profile-dr",
        "corporate_user_profile-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "44": {
    "recordTemplates": {
      "namePrefixes": [
        "iam_role_assignment-prod",
        "iam_role_assignment-stg",
        "iam_role_assignment-corp",
        "iam_role_assignment-dr",
        "iam_role_assignment-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "45": {
    "recordTemplates": {
      "namePrefixes": [
        "access_control_privilege-prod",
        "access_control_privilege-stg",
        "access_control_privilege-corp",
        "access_control_privilege-dr",
        "access_control_privilege-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "46": {
    "recordTemplates": {
      "namePrefixes": [
        "automated_service_account-prod",
        "automated_service_account-stg",
        "automated_service_account-corp",
        "automated_service_account-dr",
        "automated_service_account-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Active",
        "Suspended",
        "MFA-Required",
        "Locked",
        "Pending-Verification"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "47": {
    "recordTemplates": {
      "namePrefixes": [
        "api_key_token-prod",
        "api_key_token-stg",
        "api_key_token-corp",
        "api_key_token-dr",
        "api_key_token-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "48": {
    "recordTemplates": {
      "namePrefixes": [
        "vault_secret_entry-prod",
        "vault_secret_entry-stg",
        "vault_secret_entry-corp",
        "vault_secret_entry-dr",
        "vault_secret_entry-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "49": {
    "recordTemplates": {
      "namePrefixes": [
        "kms_master_key-prod",
        "kms_master_key-stg",
        "kms_master_key-corp",
        "kms_master_key-dr",
        "kms_master_key-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "50": {
    "recordTemplates": {
      "namePrefixes": [
        "audit_log_pipe-prod",
        "audit_log_pipe-stg",
        "audit_log_pipe-corp",
        "audit_log_pipe-dr",
        "audit_log_pipe-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "51": {
    "recordTemplates": {
      "namePrefixes": [
        "siem_detection_rule-prod",
        "siem_detection_rule-stg",
        "siem_detection_rule-corp",
        "siem_detection_rule-dr",
        "siem_detection_rule-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "52": {
    "recordTemplates": {
      "namePrefixes": [
        "cve_vulnerability_finding-prod",
        "cve_vulnerability_finding-stg",
        "cve_vulnerability_finding-corp",
        "cve_vulnerability_finding-dr",
        "cve_vulnerability_finding-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "53": {
    "recordTemplates": {
      "namePrefixes": [
        "container_sbom_scan-prod",
        "container_sbom_scan-stg",
        "container_sbom_scan-corp",
        "container_sbom_scan-dr",
        "container_sbom_scan-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "54": {
    "recordTemplates": {
      "namePrefixes": [
        "compliance_benchmark_audit-prod",
        "compliance_benchmark_audit-stg",
        "compliance_benchmark_audit-corp",
        "compliance_benchmark_audit-dr",
        "compliance_benchmark_audit-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Certified",
        "Under-Review",
        "Remediation-Needed",
        "Audited",
        "Exempt"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "55": {
    "recordTemplates": {
      "namePrefixes": [
        "prod_incident_ticket-prod",
        "prod_incident_ticket-stg",
        "prod_incident_ticket-corp",
        "prod_incident_ticket-dr",
        "prod_incident_ticket-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "56": {
    "recordTemplates": {
      "namePrefixes": [
        "oncall_pager_schedule-prod",
        "oncall_pager_schedule-stg",
        "oncall_pager_schedule-corp",
        "oncall_pager_schedule-dr",
        "oncall_pager_schedule-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "57": {
    "recordTemplates": {
      "namePrefixes": [
        "alert_notification_channel-prod",
        "alert_notification_channel-stg",
        "alert_notification_channel-corp",
        "alert_notification_channel-dr",
        "alert_notification_channel-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "58": {
    "recordTemplates": {
      "namePrefixes": [
        "metric_alert_definition-prod",
        "metric_alert_definition-stg",
        "metric_alert_definition-corp",
        "metric_alert_definition-dr",
        "metric_alert_definition-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "59": {
    "recordTemplates": {
      "namePrefixes": [
        "synthetic_ping_probe-prod",
        "synthetic_ping_probe-stg",
        "synthetic_ping_probe-corp",
        "synthetic_ping_probe-dr",
        "synthetic_ping_probe-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "60": {
    "recordTemplates": {
      "namePrefixes": [
        "saved_log_query-prod",
        "saved_log_query-stg",
        "saved_log_query-corp",
        "saved_log_query-dr",
        "saved_log_query-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "61": {
    "recordTemplates": {
      "namePrefixes": [
        "opentelemetry_span-prod",
        "opentelemetry_span-stg",
        "opentelemetry_span-corp",
        "opentelemetry_span-dr",
        "opentelemetry_span-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "62": {
    "recordTemplates": {
      "namePrefixes": [
        "apm_service_health-prod",
        "apm_service_health-stg",
        "apm_service_health-corp",
        "apm_service_health-dr",
        "apm_service_health-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "63": {
    "recordTemplates": {
      "namePrefixes": [
        "synthetic_health_check-prod",
        "synthetic_health_check-stg",
        "synthetic_health_check-corp",
        "synthetic_health_check-dr",
        "synthetic_health_check-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Firing",
        "Pending",
        "Resolved",
        "Silenced",
        "Disabled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "64": {
    "recordTemplates": {
      "namePrefixes": [
        "slo_definition_target-prod",
        "slo_definition_target-stg",
        "slo_definition_target-corp",
        "slo_definition_target-dr",
        "slo_definition_target-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "65": {
    "recordTemplates": {
      "namePrefixes": [
        "status_page_bulletin-prod",
        "status_page_bulletin-stg",
        "status_page_bulletin-corp",
        "status_page_bulletin-dr",
        "status_page_bulletin-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Open",
        "Investigating",
        "Mitigated",
        "Resolved",
        "Closed"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "66": {
    "recordTemplates": {
      "namePrefixes": [
        "finops_cost_tag-prod",
        "finops_cost_tag-stg",
        "finops_cost_tag-corp",
        "finops_cost_tag-dr",
        "finops_cost_tag-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "67": {
    "recordTemplates": {
      "namePrefixes": [
        "monthly_budget_plan-prod",
        "monthly_budget_plan-stg",
        "monthly_budget_plan-corp",
        "monthly_budget_plan-dr",
        "monthly_budget_plan-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "68": {
    "recordTemplates": {
      "namePrefixes": [
        "cost_spike_anomaly-prod",
        "cost_spike_anomaly-stg",
        "cost_spike_anomaly-corp",
        "cost_spike_anomaly-dr",
        "cost_spike_anomaly-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "69": {
    "recordTemplates": {
      "namePrefixes": [
        "reserved_instance_lease-prod",
        "reserved_instance_lease-stg",
        "reserved_instance_lease-corp",
        "reserved_instance_lease-dr",
        "reserved_instance_lease-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "70": {
    "recordTemplates": {
      "namePrefixes": [
        "savings_plan_contract-prod",
        "savings_plan_contract-stg",
        "savings_plan_contract-corp",
        "savings_plan_contract-dr",
        "savings_plan_contract-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "71": {
    "recordTemplates": {
      "namePrefixes": [
        "provider_invoice_statement-prod",
        "provider_invoice_statement-stg",
        "provider_invoice_statement-corp",
        "provider_invoice_statement-dr",
        "provider_invoice_statement-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "72": {
    "recordTemplates": {
      "namePrefixes": [
        "billing_payment_profile-prod",
        "billing_payment_profile-stg",
        "billing_payment_profile-corp",
        "billing_payment_profile-dr",
        "billing_payment_profile-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Approved",
        "Exceeded",
        "In-Grace-Period",
        "Draft",
        "Settled"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "73": {
    "recordTemplates": {
      "namePrefixes": [
        "cicd_pipeline_flow-prod",
        "cicd_pipeline_flow-stg",
        "cicd_pipeline_flow-corp",
        "cicd_pipeline_flow-dr",
        "cicd_pipeline_flow-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "74": {
    "recordTemplates": {
      "namePrefixes": [
        "build_artifact_tar-prod",
        "build_artifact_tar-stg",
        "build_artifact_tar-corp",
        "build_artifact_tar-dr",
        "build_artifact_tar-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "75": {
    "recordTemplates": {
      "namePrefixes": [
        "git_repo_webhook-prod",
        "git_repo_webhook-stg",
        "git_repo_webhook-corp",
        "git_repo_webhook-dr",
        "git_repo_webhook-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "76": {
    "recordTemplates": {
      "namePrefixes": [
        "deployment_target_env-prod",
        "deployment_target_env-stg",
        "deployment_target_env-corp",
        "deployment_target_env-dr",
        "deployment_target_env-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "77": {
    "recordTemplates": {
      "namePrefixes": [
        "terraform_iac_stack-prod",
        "terraform_iac_stack-stg",
        "terraform_iac_stack-corp",
        "terraform_iac_stack-dr",
        "terraform_iac_stack-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "78": {
    "recordTemplates": {
      "namePrefixes": [
        "statefile_lock_record-prod",
        "statefile_lock_record-stg",
        "statefile_lock_record-corp",
        "statefile_lock_record-dr",
        "statefile_lock_record-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "79": {
    "recordTemplates": {
      "namePrefixes": [
        "private_registry_space-prod",
        "private_registry_space-stg",
        "private_registry_space-corp",
        "private_registry_space-dr",
        "private_registry_space-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "80": {
    "recordTemplates": {
      "namePrefixes": [
        "helm_chart_release-prod",
        "helm_chart_release-stg",
        "helm_chart_release-corp",
        "helm_chart_release-dr",
        "helm_chart_release-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Passed",
        "Building",
        "Failed",
        "Cancelled",
        "Blocked"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "81": {
    "recordTemplates": {
      "namePrefixes": [
        "istio_mesh_gateway-prod",
        "istio_mesh_gateway-stg",
        "istio_mesh_gateway-corp",
        "istio_mesh_gateway-dr",
        "istio_mesh_gateway-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "82": {
    "recordTemplates": {
      "namePrefixes": [
        "ingress_route_map-prod",
        "ingress_route_map-stg",
        "ingress_route_map-corp",
        "ingress_route_map-dr",
        "ingress_route_map-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "83": {
    "recordTemplates": {
      "namePrefixes": [
        "envoy_filter_plugin-prod",
        "envoy_filter_plugin-stg",
        "envoy_filter_plugin-corp",
        "envoy_filter_plugin-dr",
        "envoy_filter_plugin-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "84": {
    "recordTemplates": {
      "namePrefixes": [
        "mtls_mutual_cert-prod",
        "mtls_mutual_cert-stg",
        "mtls_mutual_cert-corp",
        "mtls_mutual_cert-dr",
        "mtls_mutual_cert-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Compliant",
        "Warning",
        "Critical",
        "Exempted",
        "Remediated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "85": {
    "recordTemplates": {
      "namePrefixes": [
        "cross_cloud_peering-prod",
        "cross_cloud_peering-stg",
        "cross_cloud_peering-corp",
        "cross_cloud_peering-dr",
        "cross_cloud_peering-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "86": {
    "recordTemplates": {
      "namePrefixes": [
        "tgw_attachment_link-prod",
        "tgw_attachment_link-stg",
        "tgw_attachment_link-corp",
        "tgw_attachment_link-dr",
        "tgw_attachment_link-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "87": {
    "recordTemplates": {
      "namePrefixes": [
        "ipsec_vpn_tunnel-prod",
        "ipsec_vpn_tunnel-stg",
        "ipsec_vpn_tunnel-corp",
        "ipsec_vpn_tunnel-dr",
        "ipsec_vpn_tunnel-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "88": {
    "recordTemplates": {
      "namePrefixes": [
        "direct_interconnect_circuit-prod",
        "direct_interconnect_circuit-stg",
        "direct_interconnect_circuit-corp",
        "direct_interconnect_circuit-dr",
        "direct_interconnect_circuit-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "89": {
    "recordTemplates": {
      "namePrefixes": [
        "high_throughput_nat-prod",
        "high_throughput_nat-stg",
        "high_throughput_nat-corp",
        "high_throughput_nat-dr",
        "high_throughput_nat-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "90": {
    "recordTemplates": {
      "namePrefixes": [
        "cdn_global_distribution-prod",
        "cdn_global_distribution-stg",
        "cdn_global_distribution-corp",
        "cdn_global_distribution-dr",
        "cdn_global_distribution-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Provisioned",
        "Active",
        "Degraded",
        "Draining",
        "Terminated"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "91": {
    "recordTemplates": {
      "namePrefixes": [
        "edge_worker_lambda-prod",
        "edge_worker_lambda-stg",
        "edge_worker_lambda-corp",
        "edge_worker_lambda-dr",
        "edge_worker_lambda-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Running",
        "Stopped",
        "Scaling",
        "Spot-Interrupted",
        "Terminating"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "92": {
    "recordTemplates": {
      "namePrefixes": [
        "websocket_live_session-prod",
        "websocket_live_session-stg",
        "websocket_live_session-corp",
        "websocket_live_session-dr",
        "websocket_live_session-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Healthy",
        "Backpressured",
        "Paused",
        "Overflow",
        "Draining"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "93": {
    "recordTemplates": {
      "namePrefixes": [
        "inbound_webhook_receiver-prod",
        "inbound_webhook_receiver-stg",
        "inbound_webhook_receiver-corp",
        "inbound_webhook_receiver-dr",
        "inbound_webhook_receiver-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Active",
        "Rate-Throttled",
        "Disabled",
        "Circuit-Broken",
        "Pending"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "94": {
    "recordTemplates": {
      "namePrefixes": [
        "mobile_push_channel-prod",
        "mobile_push_channel-stg",
        "mobile_push_channel-corp",
        "mobile_push_channel-dr",
        "mobile_push_channel-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Active",
        "Rate-Throttled",
        "Disabled",
        "Circuit-Broken",
        "Pending"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "95": {
    "recordTemplates": {
      "namePrefixes": [
        "transactional_email_template-prod",
        "transactional_email_template-stg",
        "transactional_email_template-corp",
        "transactional_email_template-dr",
        "transactional_email_template-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Active",
        "Rate-Throttled",
        "Disabled",
        "Circuit-Broken",
        "Pending"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "96": {
    "recordTemplates": {
      "namePrefixes": [
        "sms_carrier_campaign-prod",
        "sms_carrier_campaign-stg",
        "sms_carrier_campaign-corp",
        "sms_carrier_campaign-dr",
        "sms_carrier_campaign-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Active",
        "Rate-Throttled",
        "Disabled",
        "Circuit-Broken",
        "Pending"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "97": {
    "recordTemplates": {
      "namePrefixes": [
        "iot_edge_device-prod",
        "iot_edge_device-stg",
        "iot_edge_device-corp",
        "iot_edge_device-dr",
        "iot_edge_device-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Connected",
        "Offline",
        "Firmware-Updating",
        "Alerting",
        "Decommissioned"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "98": {
    "recordTemplates": {
      "namePrefixes": [
        "iot_telemetry_stream-prod",
        "iot_telemetry_stream-stg",
        "iot_telemetry_stream-corp",
        "iot_telemetry_stream-dr",
        "iot_telemetry_stream-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Connected",
        "Offline",
        "Firmware-Updating",
        "Alerting",
        "Decommissioned"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "99": {
    "recordTemplates": {
      "namePrefixes": [
        "iot_twin_device_shadow-prod",
        "iot_twin_device_shadow-stg",
        "iot_twin_device_shadow-corp",
        "iot_twin_device_shadow-dr",
        "iot_twin_device_shadow-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Connected",
        "Offline",
        "Firmware-Updating",
        "Alerting",
        "Decommissioned"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "100": {
    "recordTemplates": {
      "namePrefixes": [
        "firmware_patch_version-prod",
        "firmware_patch_version-stg",
        "firmware_patch_version-corp",
        "firmware_patch_version-dr",
        "firmware_patch_version-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Connected",
        "Offline",
        "Firmware-Updating",
        "Alerting",
        "Decommissioned"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  },
  "101": {
    "recordTemplates": {
      "namePrefixes": [
        "snapshot_dr_job-prod",
        "snapshot_dr_job-stg",
        "snapshot_dr_job-corp",
        "snapshot_dr_job-dr",
        "snapshot_dr_job-shared"
      ],
      "nameSuffixes": [
        "alpha",
        "bravo",
        "charlie",
        "delta",
        "echo",
        "node-1",
        "node-2"
      ],
      "statusChoices": [
        "Available",
        "In-Use",
        "Snapshotting",
        "Archived",
        "Error"
      ],
      "metricRange": [
        10,
        5000
      ],
      "booleanLabel": "is_high_availability"
    },
    "attrs": [
      "item_code",
      "operational_state",
      "metric_quota",
      "is_high_availability",
      "registered_date"
    ]
  }
};

export const generateAdditionalRecords = (): Record<string, EntityRecord[]> => {
  const result: Record<string, EntityRecord[]> = {};

  Object.entries(modelMetaById).forEach(([entityTypeId, meta]) => {
    const records: EntityRecord[] = [];
    const tpl = meta.recordTemplates;
    const count = 180; // 180 records per entity model

    for (let i = 1; i <= count; i++) {
      const recId = String(Number(entityTypeId) * 10000 + i);
      const prefix = tpl.namePrefixes[i % tpl.namePrefixes.length];
      const suffix = tpl.nameSuffixes[(i * 3) % tpl.nameSuffixes.length];
      const code = `${prefix}-${suffix}-${String(i).padStart(3, '0')}`;
      const status = tpl.statusChoices[i % tpl.statusChoices.length];
      const minMetric = tpl.metricRange[0];
      const maxMetric = tpl.metricRange[1];
      const metricVal = minMetric + Math.floor(((i * 37) % (maxMetric - minMetric + 1)));
      const boolVal = i % 2 === 0;
      const month = (i % 12) + 1;
      const day = (i % 28) + 1;
      const dateStr = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const tenantId = regions[i % regions.length];

      const attributes: Record<string, any> = {};
      attributes[meta.attrs[0]] = code;
      attributes[meta.attrs[1]] = status;
      attributes[meta.attrs[2]] = metricVal;
      attributes[meta.attrs[3]] = boolVal;
      attributes[meta.attrs[4]] = dateStr;

      records.push({
        id: recId,
        entityTypeId,
        tenantId,
        version: 1,
        attributes,
        createdDate: new Date(2026, 0, (i % 60) + 1, 10, i % 60).toISOString(),
        updatedDate: new Date(2026, 2, (i % 25) + 1, 14, i % 60).toISOString(),
      });
    }

    result[entityTypeId] = records;
  });

  return result;
};
