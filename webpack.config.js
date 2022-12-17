const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: './src/index.tsx',
  output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
  },
  devServer: {
      open: true,
      host: 'localhost',
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: 'index.html',
      }),

      new MiniCssExtractPlugin(),
  ],
  module: {
      rules: [
          {
              test: /\.(ts|tsx)$/i,
              loader: 'ts-loader',
              exclude: ['/node_modules/'],
          },
          {
              test: /\.css$/i,
              use: [stylesHandler, 'css-loader'],
          },
          {
              test: /\.s[ac]ss$/i,
              use: [stylesHandler, 'css-loader', 'sass-loader'],
          },
          {
              test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
              type: 'asset',
          },
      ],
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};


module.exports = () => {
  if (isProduction) {
      config.mode = 'production';
  } else {
      config.mode = 'development';
      config.devtool = 'eval-source-map';
  }
  return config;
};