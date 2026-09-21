# Local Infrastructure & GitOps

This workspace contains the Kubernetes and Crossplane manifests for the Project0 ecosystem.

## Prerequisites
- [Docker](https://www.docker.com/)
- [Kind](https://kind.sigs.k8s.io/) (Kubernetes IN Docker)
- `kubectl`

## Local Reverse Proxy Runbook

1. **Spin up the Kind Cluster**
   ```bash
   kind create cluster --name project0-local
   ```

2. **Build and Load Docker Images**
   *(Run these commands from the root of the monorepo)*
   ```bash
   # Build images
   docker build -t project0/tekgo-ui:latest -f apps/tekgo-ui/Dockerfile .
   docker build -t project0/console:latest -f apps/console/Dockerfile .
   docker build -t project0/backend:latest -f apps/backend/project0-ms-aio/deloyment/Dockerfile .

   # Load images into Kind
   kind load docker-image project0/tekgo-ui:latest --name project0-local
   kind load docker-image project0/console:latest --name project0-local
   kind load docker-image project0/backend:latest --name project0-local
   ```

3. **Install NGINX Ingress Controller**
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
   
   # Wait for the ingress pod to be ready
   kubectl wait --namespace ingress-nginx \
     --for=condition=ready pod \
     --selector=app.kubernetes.io/component=controller \
     --timeout=90s
   ```

3. **Apply the Local Manifests**
   ```bash
   kubectl apply -k k8s/overlays/local/
   ```

4. **Testing Routing**
   - **Tekgo UI**: Requests to `http://app.local/`
     *(Make sure to add `127.0.0.1 app.local` to your `/etc/hosts` or pass `Host: app.local` via cURL)*
     ```bash
     curl -H "Host: app.local" http://localhost/
     ```
   - **Console (Admin)**: Requests to `http://localhost/admin`
   - **Backend (API)**: Requests to `http://localhost/api`
