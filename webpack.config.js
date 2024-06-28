const webpack = require("webpack");
const path = require("path");

/**
 * Create an absolute URL to the given URI inside the current directory
 * @param {string} [uri = ""] - The URI to the desired file
 * @returns {string}
 */
const here = (uri = "") => path.resolve(__dirname, uri);

module.exports = {
	mode: "production",
	entry: here("./src/index.ts"),
	devtool: "source-map",
	plugins: [
		// new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // avoid bundling momentjs locales
	],
	module: {
		rules: [
			{
				test: /(?!\.d)\.tsx?$/i,
				use: "ts-loader",
				include: here("src/"),
				exclude: [
					"node_modules/",
					"test/"
				].map(here),
			},
		],
	},
	resolve: {
		extensions: ["ts", "js", "tsx"].map(ext => `.${ext}`),
	},
	output: {
		filename: "index.js",
		path: here("dist"),
		library: "gdprGuardLocal",
		libraryTarget: "umd",
		globalObject: "typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : this",
	},
};
