const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const os = require('os');

// Automatically detect physical Wi-Fi / Ethernet IPv4 address
// to bypass virtual adapters (WSL, Hyper-V, Docker, Cloudflare WARP) on Windows.
function getPhysicalLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const [name, addrs] of Object.entries(interfaces)) {
    const isVirtual = /vethernet|wsl|hyper-v|virtual|pseudo|loopback|warp|cloudflare/i.test(name);
    if (!isVirtual && addrs) {
      for (const addr of addrs) {
        if (addr.family === 'IPv4' && !addr.internal) {
          return addr.address;
        }
      }
    }
  }
  return null;
}

const physicalIp = getPhysicalLocalIp();
if (physicalIp && !process.env.REACT_NATIVE_PACKAGER_HOSTNAME) {
  process.env.REACT_NATIVE_PACKAGER_HOSTNAME = physicalIp;
  console.log(`\x1b[36m[Metro]\x1b[0m Automatically detected LAN IP: \x1b[32m${physicalIp}\x1b[0m`);
}

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
