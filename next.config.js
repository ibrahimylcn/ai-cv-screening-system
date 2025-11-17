/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // CV dosyaları için yüksek boyut limiti
  serverRuntimeConfig: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
  // Font optimizasyonu - build sırasında timeout'u önlemek için
  optimizeFonts: true,
  // Build sırasında external font yüklemesini daha toleranslı hale getir
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig

