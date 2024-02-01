module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve('util/'),
        path: require.resolve('path-browserify'),
      },
    },
  },
  devServer: {
    proxy: 'http://localhost:61050',
    }
  }
