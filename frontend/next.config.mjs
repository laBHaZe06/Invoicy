/** @type {import('next').NextConfig} */

const nextConfig = {
  'output': 'standalone',
  'env': {
    'API_URL': 'http://localhost:8000/api',
  }
};


export default nextConfig;
