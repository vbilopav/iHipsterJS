/**
 * Following values will replace any missing value in configuration file.
 * This file is read only. 
 * Values can be overriden in configuration files.
 */
({
    /**
    * Framework dir is location of framework source code, relative to location of this script
    */
    frameworkDir: "../dev/",
    /**
    * Entry point file name in framework dir
    */
    entryPointFile: 'ihjs.js',
    /**
     * Build output directory, recreated on every build.
     * Can include expressions from this config file like `${this.version}` which will give version from this config.
     */
    outputDir: "../build/${this.version}/",
    /**
    *  Name of output file saved in output dir.
    */
    bundleFile: 'ihjs.js',
    /**
     * Comment created at the start of bunlde of file. Can include expressions from this config.
     */
    bundleComment: 'ihjs, build: ${this.timestamp}, version: ${this.version}',
    /**
     * Name of default package.json file that will be used to read current version automatically if not explicitilly stated.
     */
    packageFile: '../package.json',
    /**
     * Should non `.js` files be copied to output?
     */
    copyNonJsFiles: true,
    /**
     * Default file operation - copy or minify and if minify how.
     * `false` or `null` value will leave source file intact as is.
     * `true` value will use default uglifyEs options. 
     * To specify specific options use options object: `https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options`
     * To use different minify engine modify `./modules/minify.js`
     */
    minifyDefault: true,
    /**
     * Individual module minify options to override default.
     * Keys are individual modules relative to source dir, value is minifiy option described under minifyJs
     * Example: `minifyModules: {'spa/router.js': false, 'spa/view-manager.js': false} // do not minify following modules`
     */
    minifyModules: {},
    /**
     * List of module names relative to source dir that will be lazy loaded.
     * Lazy modules are not bundled and they are copied to file system and loaded when requested.
     * Example: `lazyModules: ['spa/router.js', 'spa/view-manager.js'] // do not bundle following modules and load when requested`
     */
    lazyModules: [],
    /**
    * List of module names relative to source dir that will be skipped.
    * Use this with caution to avoid broken references.
    * Example: `skipModules: ['spa/router.js', 'spa/view-manager.js'] // since we don't use spa application, we don't need them`
    */
    skipModules: [],
    /**
    * Default module loader that will be bundled with framework and app.
    */
    loaderFile: "../dev/loader/loader.js",
    /**
    * Should loader be minified?
    */
    minifyLoader: true,
    /**
     * Plugins module dir name. Plugins have special treatment. This name identifies plugin modules.
     */
    plugins: "plugins",
    /**
    * Application root directory relative to location of this script.
    * This dir will be used to join appBundleModules and appBundleDirs if custom is enabled.
    */
    appDir: null,
    /**
    * Prefix that will be added to module name in custom build.
    * That is usually path that application expects.
    * For example: `moduleNamePrefix: "demos/remote-data/module-view3-custom-build/"`
    */
    moduleNamePrefix: "",
    /**
    * File list included in custom build relative to `appDir`. 
    */
    appBundleModules: [],
    /**
    *  Dir list included in custom build relative to `appDir`. 
    */
    appBundleDirs: [],
    /**
    * Output detailed log to console
    */
    verbose: true
})