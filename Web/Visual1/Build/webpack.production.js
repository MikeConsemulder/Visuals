const merge = require("webpack-merge");
const webpack = require('webpack');

module.exports = merge([
	{
		plugins: [
			new webpack.LoaderOptionsPlugin({
				minimize: true
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			})
		],
		optimization: {
			minimize: true
		}
	}
]);
