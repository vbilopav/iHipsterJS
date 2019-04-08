({
    //
    // Build output directory, recreated on every build
    // ${this.version} is substitute for version value found in ../src/ihjs/package.json
    //
    outputDir: "../src/ihjs/build/${this.version}/",

    minifyJs: true
})