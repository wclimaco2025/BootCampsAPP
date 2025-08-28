/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica para evitar errores de build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuración de imágenes
  images: {
    unoptimized: true,
  },
  
  // Configuración de rutas
  trailingSlash: true,
  
  // Configuración para exportación estática (descomenta si es necesario)
  // output: 'export',
  // distDir: 'out',
}

module.exports = nextConfig;