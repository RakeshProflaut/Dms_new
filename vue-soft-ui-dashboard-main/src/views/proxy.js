const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configure the proxy middleware
const apiProxy = createProxyMiddleware('/dms', {
  target: 'http://localhost:61050', // Your backend server URL
  changeOrigin: true,
  pathRewrite: {
    '^/dms': '', // Remove the '/dms' prefix when forwarding requests
  },
});

// Apply the proxy middleware to your routes
app.use('/dms', apiProxy);

// Start the proxy server on a local port
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
