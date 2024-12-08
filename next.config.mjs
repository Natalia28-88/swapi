/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/REPO_NAME", // Замените на имя вашего репозитория
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
