# Project0 Infrastructure & GitOps Workflows

This directory (`/infra`) contains the Infrastructure-as-Code (IaC) and Kubernetes manifests for the Project0 ecosystem. It is designed around **GitOps** principles using Kustomize and Crossplane.

## Architectural Overview

- **`k8s/base/`**: The core workloads (Deployments, Services, StatefulSets). Changes here affect *all* environments. Includes our self-hosted PostgreSQL database.
- **`k8s/overlays/local/`**: Patches for local development. Includes the NGINX Ingress controller configuration.
- **`k8s/overlays/staging|production/`**: Patches for live environments. Includes High Availability (HA) replica scaling, HPAs, and Crossplane claims for cloud-managed Load Balancers.
- **`crossplane/`**: The actual infrastructure blueprints (XRDs and Compositions) that teach the production cluster how to provision AWS/GCP resources.

---

## 1. Local Development Workflow

Use this workflow to test the entire microservice ecosystem locally on your machine using **Kind** (Kubernetes IN Docker).

### Prerequisites
- [Docker](https://www.docker.com/)
- [Kind](https://kind.sigs.k8s.io/)
- `kubectl`

### Step 1: Build Local Images
Run these commands from the **root** of the monorepo to build the optimized Turborepo multi-stage images:
```bash
docker build -t project0/tekgo-ui:latest -f apps/tekgo-ui/Dockerfile .
docker build -t project0/console:latest -f apps/console/Dockerfile .
docker build -t project0/backend:latest -f apps/backend/project0-ms-aio/deloyment/Dockerfile .
```

### Step 2: Spin Up Cluster & Load Images
```bash
kind create cluster --name project0-local

# Load your locally built images into the cluster
kind load docker-image project0/tekgo-ui:latest --name project0-local
kind load docker-image project0/console:latest --name project0-local
kind load docker-image project0/backend:latest --name project0-local
```

### Step 3: Install Local Ingress Controller
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# Wait for the ingress pod to be ready
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
```

### Step 4: Apply Local Overlay
This applies the base workloads, the PostgreSQL database, and the local routing rules.
```bash
kubectl apply -k infra/k8s/overlays/local/
```

### Step 5: Test Routing
- **Tekgo UI**: `curl -H "Host: app.local" http://localhost/`
- **Console (Admin)**: `http://localhost/admin`
- **Backend (API)**: `http://localhost/api`

---

## 2. Infrastructure Modification Workflow

When you need to alter the infrastructure (e.g., adding environment variables, bumping memory limits, creating new services):

1. **Environment-Agnostic Changes**: Edit files in `infra/k8s/base/`.
2. **Environment-Specific Changes**: Edit files in `infra/k8s/overlays/<env>/`.
3. **Cloud Infrastructure Changes**: Edit the Crossplane definitions in `infra/crossplane/`.
4. **Validation**: Always validate your YAML before committing by running the Turborepo pipeline from the project root:
   ```bash
   pnpm turbo validate:infra
   ```

---

## 3. Production Deployment Workflow (GitOps)

For staging and production environments, **do not run `kubectl apply` manually**. 

1. Push your infrastructure changes to the `main` branch.
2. A GitOps controller (such as **ArgoCD** or **Flux**) running in your production cluster will detect the commit.
3. The GitOps controller automatically synchronizes the cluster state by applying `infra/k8s/overlays/production/`.
4. If a Crossplane Claim (like `AppLoadBalancer`) was updated, the in-cluster Crossplane operator will automatically communicate with AWS/GCP to adjust the physical cloud resources.

Git is the single source of truth for the entire physical system.
