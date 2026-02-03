/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APPS_SCRIPT_URL: process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_PROD_URL/exec',
    NEXT_PUBLIC_APPS_SCRIPT_TOKEN: process.env.NEXT_PUBLIC_APPS_SCRIPT_TOKEN || 'prod_secret_token_make_this_very_long_and_random_67890',
  },
};

module.exports = nextConfig;
