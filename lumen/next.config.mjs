/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: false },
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  // Disable Next's version-check ping so it doesn't fail behind corporate firewalls.
  // (Harmless either way, but keeps logs clean.)
  productionBrowserSourceMaps: false,
};
export default nextConfig;
