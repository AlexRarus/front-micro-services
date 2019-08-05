import Config from 'webpack-config';

export default new Config().extend('src/webpack.base.config.js').merge({
  output: {
    filename: 'bundle.min.[hash:8].js'
  },
  optimization: {
    minimize: true
  },
  mode: 'production',
  devtool: 'source-map'
});
