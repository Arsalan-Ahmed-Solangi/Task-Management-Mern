/** @type {import('next').NextConfig} */
const nextConfig = {

    //*****ChangingTheRootPath******//
    async rewrites() {
        return [
          {
            source: '/',
            destination: '/auth/login',
          },
        ];
      },
};

export default nextConfig;
