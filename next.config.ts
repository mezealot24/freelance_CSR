import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ปิด ESLint ระหว่างการ build (ไม่แนะนำสำหรับโปรดักชัน)
  },
  /* config options here */
};

export default nextConfig;