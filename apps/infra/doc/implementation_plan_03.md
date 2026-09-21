# Kustomize Infrastructure Restructuring Plan

As a best practice for GitOps and physical repository structure, we need to separate our environment-agnostic resources from environment-specific configurations. We will introduce **Kustomize** (native to `kubectl`) to create a `base` layer and explicit `overlays` for Local and Production.

## Proposed Architecture

```text
apps/infra/
├── crossplane/                     # System Blueprints (XRDs/Compositions applied by cluster admins)
└── k8s/
    ├── base/                       # Common Workloads (Deployments, Services)
    │   ├── kustomization.yaml
    │   ├── tekgo-ui.yaml
    │   ├── console.yaml
    │   └── backend.yaml
    └── overlays/
        ├── local/                  # Kind Cluster Configuration
        │   ├── kustomization.yaml
        │   └── ingress.yaml        # NGINX Ingress Controller config
        └── production/             # Live Cloud Configuration
            ├── kustomization.yaml
            ├── replica-patch.yaml  # Scales replicas up to 3 for HA
            ├── hpa.yaml            # Horizontal Pod Autoscalers
            └── alb-claim.yaml      # Crossplane AppLoadBalancer Claim
```

## User Review Required

> [!IMPORTANT]
> - By adopting Kustomize, your local deployment command will change from `kubectl apply -f apps/infra/k8s/` to `kubectl apply -k apps/infra/k8s/overlays/local/`.
> - The production overlay will include High Availability (HA) best practices by default, bumping replica counts to 3 and including an HPA (Horizontal Pod Autoscaler).
>
> Do you approve of this Kustomize structure?

## Execution Steps

### 1. Reorganize Base Manifests
- Move `tekgo-ui.yaml`, `console.yaml`, and `backend.yaml` into `apps/infra/k8s/base/`.
- Create `apps/infra/k8s/base/kustomization.yaml` to include them.

### 2. Construct Local Overlay
- Move `ingress.yaml` into `apps/infra/k8s/overlays/local/`.
- Create `apps/infra/k8s/overlays/local/kustomization.yaml` to reference the base and the local ingress.

### 3. Construct Production Overlay
- Create `apps/infra/k8s/overlays/production/kustomization.yaml`.
- Add `replica-patch.yaml` to override replica counts from `1` (base) to `3` (production).
- Add an `alb-claim.yaml` that invokes the Crossplane `AppLoadBalancer` we defined earlier.
- Add `hpa.yaml` establishing CPU-based autoscaling limits.

### 4. Update Documentation
- Update `apps/infra/README.md` to reflect the new `kubectl apply -k` commands and explain the Kustomize strategy.
