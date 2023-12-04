import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: any) {
  app.use(
    '/rss',
    createProxyMiddleware({
      target: 'https://www.clarin.com',
      changeOrigin: true,
    })
  );
};