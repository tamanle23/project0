# Implementation Plan 03 - Dynamic LAN IP Detection for Metro & Expo Go

## Problem
On Windows machines with WSL, Hyper-V, Docker, or Cloudflare WARP, multiple virtual network adapters are created. Expo CLI's default IP detection (`internal-ip`) defaults to the virtual adapter (e.g., `172.16.x.x` or `172.18.x.x`) instead of the host machine's physical Wi-Fi adapter (`192.168.x.x`).

Currently, the user had to manually set:
`$env:REACT_NATIVE_PACKAGER_HOSTNAME="192.168.1.148"`
which is static and breaks if the machine's local IP changes (e.g. switching Wi-Fi networks or DHCP renewal).

## Solution
We will implement an automated, dynamic IP resolver directly inside `metro.config.js`:
1. Inspects `os.networkInterfaces()`.
2. Ignores virtual, hypervisor, and VPN adapters (`vEthernet`, `WSL`, `Hyper-V`, `CloudflareWARP`, `Loopback`).
3. Discovers the active physical IPv4 Wi-Fi / Ethernet interface automatically.
4. Dynamically assigns `process.env.REACT_NATIVE_PACKAGER_HOSTNAME` before Expo bundler generates the QR code and deep links.
5. Also add an optional fallback cross-platform launcher script in `package.json` to ensure zero manual IP management.

## Verification Plan
1. Update `metro.config.js` with the dynamic IP detection logic.
2. Verify with Node that `os.networkInterfaces()` correctly resolves to `192.168.1.148` (or active Wi-Fi).
3. Test running `pnpm start` to ensure the dynamically detected IP is logged and used without needing manual `$env:REACT_NATIVE_PACKAGER_HOSTNAME`.
