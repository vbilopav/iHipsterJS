/**
 * build configuration
 */
({
    version: "1",
    outputDir: "../../../demos/todo-demo/components-ts/output/",
    bundleFile: 'bundle.js',
    copyNonJsFiles: false,
    bundleComment: 'web-components-ts example, custom build: ${this.timestamp}, version: ${this.version}',
    appDir: "../../../demos/todo-demo/components-ts/",
    moduleNamePrefix: "demos/todo-demo/components-ts/",
    appBundleDirs: ["app"]
})