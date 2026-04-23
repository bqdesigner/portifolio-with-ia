/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/blog',
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' },
    ],
  },
};

export default nextConfig;
