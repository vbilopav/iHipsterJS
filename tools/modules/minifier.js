const uglifyEs = require("uglify-es");

//
// Replace this implementation if you'd like to use something else like babel toolchain
//
module.exports = function(source, target, log) {
    if (!log) {
        log = console.log;
    }
    if (!this.minifyJs) {
        fs.copyFileSync(source, target);
        return;
    }
    const options = this.minifyJs === true ? null : this.minifyJs;
    return uglifyEs.minify(fs.readFileSync(item.full).toString(), options);
}

