/**
 * build configuration
 */
({
    version: "1",
    outputDir: "../../../demos/todo-demo/web-components-ts/output/",
    bundleFile: 'bundle.js',
    copyNonJsFiles: false,
    bundleComment: 'web-components-ts example, custom build: ${this.timestamp}, version: ${this.version}',
    appDir: "../../../demos/todo-demo/web-components-ts/",
    moduleNamePrefix: "demos/todo-demo/web-components-ts/",
    appBundleDirs: ["app"]
})