###Built-in plugins内置的插件

	// webpack should be in the node_modules directory, install if not.
	var webpack = require("webpack");

	module.exports = {
	    plugins: [
	        new webpack.ResolverPlugin([
	            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
	        ], ["normal", "loader"])
	    ]
	};
	
	
###Other plugins

	npm install component-webpack-plugin


	var ComponentPlugin = require("component-webpack-plugin");
	module.exports = {
	    plugins: [
	        new ComponentPlugin()
	    ]
	}
