/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/swapi", // Имя репозитория
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
