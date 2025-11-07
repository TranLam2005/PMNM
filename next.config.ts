import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    interface WebpackRule {
      test?: RegExp;
      issuer?: any;
      resourceQuery?: { not?: Array<RegExp | string> } | RegExp;
      use?: string | Array<any>;
      exclude?: RegExp | string | Array<RegExp | string>;
    }

    const fileLoaderRule = config.module.rules.find(
      (rule: WebpackRule) => rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url để import như URL
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not ?? []), /url/] },
        use: ['@svgr/webpack'],
      }
    );

    // để file loader không xử lý lại svg
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  images: { domains: ['upload.wikimedia.org'] },
  reactStrictMode: true,
  output: 'standalone',
};

export default nextConfig;