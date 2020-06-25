const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = true; 

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: '[name].[hash].js',
    chunkFilename: '[id].js',
  },
  module: {
    rules: [
      // { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              filename: '[name].css',
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true, 
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: "dist",
  },
	optimization: {
		usedExports: true,
		// minimize: false,
		moduleIds: 'hashed',
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //     $: "jquery",
    //     jQuery: "jquery"
    // }),
    new CleanWebpackPlugin(),
   
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
		}),
	],
	devServer: {
		hot: true,
		compress: false,
	}
};
