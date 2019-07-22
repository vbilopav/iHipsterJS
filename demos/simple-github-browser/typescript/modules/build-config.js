/**
 * build configuration
 */
({
    version: "1",
    outputDir: "../../../demos/simple-github-browser/typescript/modules/web/build/",
    bundleFile: 'app-${this.version}.js',
    copyNonJsFiles: false,
    bundleComment: "simple-github-browser example, custom build: ${this.timestamp}, version: ${this.version}",
    appDir: "../../../demos/simple-github-browser/typescript/modules/web/",
    moduleNamePrefix: "demos/simple-github-browser/typescript/modules/web/",
    appBundleDirs: ["_js"]
})