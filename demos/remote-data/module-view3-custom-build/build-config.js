/*
To rebuild run following command from "src/ihjs/tools" dir:
node build ..\..\..\demos\remote-data\module-view3-custom-build\build-config.js
*/
({
    //
    // version number will be part of output dir
    //
    version: "1",
    //
    // save resulting bundle to /build/version/
    //
    outputDir: "../../../demos/remote-data/module-view3-custom-build/build/${this.version}/",
    //
    // bunlde file name
    //
    bundleFile: 'build-demo.js',
    //
    // there is no need top copy d.ts files, since thise demo doesn't use typescript
    //
    copyNonJsFiles: false,
    //
    // bundle comment
    //
    bundleComment: 'custom build: ${this.timestamp}, version: ${this.version}',
    //
    // not using spa and custom components capabilities, so we don't need them
    // 
    skipModules: ['spa.js', 'spa/router.js', 'spa/view-manager.js', 'components.js'],
    //
    // look for additional modules to include in custom bundle here
    //
    appDir: "../../../demos/remote-data/module-view3-custom-build/",
    //
    // module name start with this prefix
    //
    moduleNamePrefix: "demos/remote-data/module-view3-custom-build/",
    //
    // bundle these into custom build
    //
    appBundleModules: ["module-view.js", "templates.html"]
})