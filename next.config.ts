import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    // Relays browser console output into .next/dev/logs/ in dev mode. On
    // this machine it fed back into Turbopack's file watcher (log write ->
    // file-change -> HMR full reload -> new page load logs again -> loop),
    // causing a continuous page-reload loop. Disabled until that's fixed
    // upstream.
    browserToTerminal: false,
  },
};

export default nextConfig;
