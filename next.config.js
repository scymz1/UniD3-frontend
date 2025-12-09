/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false,
    // 最关键的这一行：
    disableOptimizedLoading: true,
  },
  // 彻底禁止 Next 使用 lightningcss
  compiler: {
    css: {
      // turbo css = lightningcss
      turbo: false,
    },
  },
};

module.exports = nextConfig;
