// 
// Following values will replace any missing value in configuration file.
// This file is read only. 
// Values can be overriden in configuration files.
//
({
    //
    // Source dir is location of framework source code, relative to location of this script
    //
    frameworkDir: "../src/ihjs/dev/",
    //
    // Entry point file name in framework dir
    //
    entryPointFile: 'ihjs.js',
    //
    // Build output directory, recreated on every build
    // ${this.version} is substitute for version value found in ../src/ihjs/package.json
    //
    outputDir: "../src/ihjs/build/${this.version}/",
    //
    // Name of output file saved in output dir.
    //
    bundleFile: 'ihjs.js',
    //
    // Name of output file saved in output dir.
    //
    bundleComment: 'ihjs, build: ${this.timestamp}, version: ${this.version}',
    //
    // Name of default package.json file that will be used to read current version.
    //
    packageFile: '../src/ihjs/package.json',
    //
    // Default file operation - copy or minify and if minify how
    // false or null value will leave source file intact as is.
    // true value will use default uglifyEs options. 
    // To specify specific options use options object -> https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
    // To use different minify engine modify ./modules/minify.js
    //
    minifyDefault: true,
    //
    // Individual module minify options to override default
    // Keys are individual modules relative to source dir, value is minifiy option described under minifyJs
    // Example: minifyModules: {'spa/router.js': false, 'spa/view-manager.js': false} // do not minify following modules
    //
    minifyModules: {},
    //
    // List of module names relative to source dir that will be lazy loaded.
    // Lazy modules are not bundled and they are copied to file system and loaded when requested
    // Example: lazyModules: ['spa/router.js', 'spa/view-manager.js'] // do not bundle following modules and load when requested
    //
    lazyModules: [],
    //
    // List of module names relative to source dir that will be skipped.
    // Use this with caution to avoid broken references
    // Example: skipModules: ['spa/router.js', 'spa/view-manager.js'] // since we don't use spa application, we don't need them
    //
    skipModules: [],
    //
    // Default module loader that is bundled
    //
    loaderFile: "../src/ihjs/dev/loader/loader.js",
    //
    // Should loader be minified
    //
    minifyLoader: true,
    //
    // Plugins module dir name
    //
    plugins: "plugins",
    //
    // Output detailed log to console
    //
    verbose: true
})