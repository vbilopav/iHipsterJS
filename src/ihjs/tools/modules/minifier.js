const uglifyEs = require("uglify-es");

//
// Replace this implementation if you'd like to use something else like babel toolchain
//
module.exports = function(content, options) {
    let ret = uglifyEs.minify(content, options === true ? null : options);
    if (ret.error) {
        throw `${ret.error.message}, pos: ${ret.error.pos}, col: ${ret.error.col}`;
    }
    return ret.code;
}
