import Config from 'webpack-config';
import webpack from 'webpack';
import path from 'path';
import pathApp from './path';

export default new Config().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: 'bundle-[hash:8].js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(pathApp.root),
    port: 3333,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
