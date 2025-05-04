/** @type {import('next').NextConfig} */

const nextConfig = {
  'output': 'standalone',
  'env': {
    'API_URL': 'http://localhost:8000/api',
    'URL_ADMIN': 'http://localhost:8000/admin',
  }
};


export default nextConfig;
