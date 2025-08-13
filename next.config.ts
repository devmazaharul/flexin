import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],

  images:{
  remotePatterns:[
    {
      protocol: 'https',
        hostname: '**',
        pathname: '/**',

    }
  ]
}
};

export default nextConfig;
