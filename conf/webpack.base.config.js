import Config from 'webpack-config';
import path from 'path';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import pathApp from './path';

const styledComponentsTransformer = createStyledComponentsTransformer();

export default new Config().merge({
  entry: 'src/index.tsx',
  output: {
    path: path.resolve(process.cwd(), 'public'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules', 'src'].map(p => path.resolve(p)),
    alias: pathApp.alias
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          configFileName: path.resolve(pathApp.root, 'tsconfig.json'),
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin()
  ]
});
