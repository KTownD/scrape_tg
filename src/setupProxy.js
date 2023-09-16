const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/', // Specify the path you want to proxy
    createProxyMiddleware({
      target: 'https://torrentgalaxy.to/',
      changeOrigin: true,
      pathRewrite: { '/api/': '' },
    })
  );

  app.use(
    '/wc/', // Specify the path you want to proxy
    createProxyMiddleware({
      target: 'https://img.wonkychickens.org/',
      changeOrigin: true,
      pathRewrite: { '/wc/': '' },
    })
  );
};
