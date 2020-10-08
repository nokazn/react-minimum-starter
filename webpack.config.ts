import * as path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
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
    publicPath: '/js/',
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
    }),
    new ESLintPlugin({
      extensions: ['tsx', 'ts', 'jsx', 'js'],
    }),
  ],
  optimization: {
    minimize: true,
    // typescript-eslint が上手く推論できでない?
    // https://github.com/typescript-eslint/typescript-eslint/issues/2109
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
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
