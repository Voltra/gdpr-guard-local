module.exports = {
	out: "docs",
	emit: "docs",
	entryPointStrategy: "expand",
	entryPoints: ["src"],
    readme: "README.md",
    exclude: [
        "node_modules/"
    ],
    theme: "node_modules/eledoc/bin/default/",
	includeVersion: true,
    hideGenerator: true,
	githubPages: true,
};
