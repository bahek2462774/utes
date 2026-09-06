import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // The production host (nginx, no custom rewrite rules — FTP-only deploy,
  // no access to server config) serves each route's directory, not
  // `<route>.html`. Without this, `/privacy` 301s to `/privacy/` and then
  // 403s because that directory holds only RSC payload files, not an
  // index.html. trailingSlash makes the export emit `<route>/index.html`
  // instead, which nginx's directory index serves correctly.
  trailingSlash: true,
};

export default nextConfig;
