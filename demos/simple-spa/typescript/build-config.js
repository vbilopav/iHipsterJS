/**
 * build configuration
 */
({
    version: "1",
    outputDir: "../../../demos/simple-spa/typescript/output/",
    bundleFile: 'bundle.js',
    copyNonJsFiles: false,
    bundleComment: 'typescript example, custom build: ${this.timestamp}, version: ${this.version}',
    appDir: "../../../demos/simple-spa/typescript/",
    moduleNamePrefix: "demos/simple-spa/typescript/",
    appBundleDirs: ["js"]
})