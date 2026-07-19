/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This app is nested inside the main site's repo; pin the root so Next does not
  // infer the parent directory from its lockfile.
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
