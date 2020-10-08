import * as path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import type { Configuration } from 'webpack';
import packageJson from './package.json';

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const config: Configuration = {
  mode,

  target: 'web',

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
        test: /\.s?css$/,
        // sass-loader -> css-loader -> style-loader の順に実行
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            // fork-ts-checker-webpack-plugin で型チェックする
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      // react-dom のかわりに @hot-loader/react-dom を使用する
      // https://github.com/gaearon/react-hot-loader#hot-loaderreact-dom
      'react-dom': '@hot-loader/react-dom',
    },
  },

  plugins: [
    // html ファイルに script タグを挿入
    new HtmlPlugin({
      template: './public/index.html',
      title: packageJson.name,
      description: packageJson.description,
    }),
    new ESLintPlugin({
      extensions: ['tsx', 'ts', 'jsx', 'js'],
    }),
    new ForkTsCheckerPlugin(),
  ],

  optimization: {
    nodeEnv: mode,
    minimize: isProduction,
    minimizer: [new TerserPlugin()],
  },

  devServer: {
    hot: true,
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    contentBase: './public',
    watchContentBase: true,
    // quiet, noInfo では少なすぎるので bundle information を細かく設定
    stats: {
      assets: false,
      builtAt: false,
      // moduleAssets: false,
      // cachedModules: false,
      cachedAssets: false,
      // runtimeModules: false,
      children: false,
      chunks: false,
      chunkOrigins: false,
      hash: false,
      modules: false,
      moduleTrace: false,
      performance: false,
      publicPath: false,
      reasons: false,
      timings: false,
      // chunkGroupAuxiliary: false,
      // chunkGroupChildren: false,
      chunkModules: false,
      colors: true,
      version: false,
    },
  },
};

export default config;
