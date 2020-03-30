const merge = require("webpack-merge");
const ProductionConfig = require("./Build/webpack.production");
const CommonConfig = require("./Build/webpack.common");

module.exports = mode => {
	
	if (mode === "production") {
		return merge(CommonConfig(mode), ProductionConfig, { mode });
	}
  
	return merge(CommonConfig(mode), { mode });
};