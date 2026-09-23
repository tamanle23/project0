# Provider-Specific Storage Configuration Fields

## Changes Made
- **Dynamic Configuration Form**: Updated `storage-manage-dialog.tsx` to dynamically render distinct inputs matching the exact settings required by each storage provider:
  - **Cloudflare R2**: Account ID, Endpoint (`https://<ACCOUNT_ID>.r2.cloudflarestorage.com`), Bucket, Region (`auto`), Access Key ID (`<YOUR_ACCESS_KEY_ID>`), and Secret Access Key (`<YOUR_SECRET_ACCESS_KEY>`).
  - **Amazon S3**: Bucket Name, Region (`us-east-1`), Access Key ID, and Secret Access Key.
  - **Google Cloud Storage (GCS)**: GCP Project ID, Bucket Name, Client Email, and Private Key.
  - **Google Drive**: Root Folder ID, OAuth Client ID, Client Secret, and Refresh Token.
  - **Storj**: Satellite URL (`us1.storj.io`), Bucket Name, and Access Grant.

## Verification
- Verified each provider displays its relevant configuration schema in the Manage dialog.
- Verified Cloudflare R2 matches the official Cloudflare S3 API documentation specification.
- Verified lint checks pass for modified files.
