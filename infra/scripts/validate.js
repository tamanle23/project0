const { execSync } = require('child_process');

console.log('Starting Infrastructure Validation...\n');

try {
  console.log('Validating [local] overlay...');
  execSync('kubectl kustomize k8s/overlays/local', { stdio: 'ignore' });
  
  console.log('Validating [staging] overlay...');
  execSync('kubectl kustomize k8s/overlays/staging', { stdio: 'ignore' });
  
  console.log('Validating [production] overlay...');
  execSync('kubectl kustomize k8s/overlays/production', { stdio: 'ignore' });
  
  console.log('Validating Crossplane blueprints (Skipped API validation - requires Crossplane CRDs)...');
  // Note: kubectl apply --dry-run=client requires the cluster to know the apiextensions.crossplane.io/v1 CRD.
  // We rely on standard Kustomize validation for the rest.

  console.log('\n✅ All infrastructure manifests rendered successfully!');
} catch (error) {
  console.error('\n❌ Infrastructure validation failed.');
  console.error('Run the commands manually (e.g. `kubectl kustomize k8s/overlays/production`) to view the exact YAML syntax error.');
  process.exit(1);
}
