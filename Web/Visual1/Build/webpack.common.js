const path = require('path');
const merge = require("webpack-merge");
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require('./config');

console.log(path.resolve(__dirname, '../dist'));

module.exports = mode => {

	return merge([{
		entry: './src/main.ts',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},
		mode: 'development',
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.css$/,
					use: [
						'vue-style-loader',
						'css-loader'
					]
				},
				{
					test: /\.js$/,
					loader: 'babel-loader'
				},
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules\/(?!@studyportals\/).*/,
					options: {
						appendTsSuffixTo: [/\.vue$/]
					},
				},
			],
		},
		resolve: {
			extensions: ['*', '.ts', '.js', '.vue', '.json']
		},
		devServer: {
			open: true,
			overlay: true,
			writeToDisk: true
		},
		performance: {
			hints: false
		},
		optimization: {
			minimize: false
		},
		plugins: [
			new VueLoaderPlugin(),
			new HtmlWebpackPlugin({
				title: "MidiController",
				iconset: config.ICONSET_URL[mode],
				template: path.resolve(__dirname, '../src/index.html'),
				filename: path.resolve(__dirname, '../index.html')
			})
		]
	}])
};