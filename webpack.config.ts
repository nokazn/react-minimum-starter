import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import type { Configuration } from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',
  // https://github.com/gaearon/react-hot-loader#getting-started
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    // 絶対パス
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // sass-loader -> css-loader -> style-loader の順に実行
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // html ファイルに script タグを挿入
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ESLintPlugin({
      extensions: ['tsx', 'ts', 'jsx', 'js'],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      // react-dom のかわりに @hot-loader/react-dom を使用する
      // https://github.com/gaearon/react-hot-loader#hot-loaderreact-dom
      'react-dom': '@hot-loader/react-dom',
    },
  },
};

export default config;
