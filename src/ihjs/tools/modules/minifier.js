const uglifyEs = require("uglify-es");

//
// Replace this implementation if you'd like to use something else like babel toolchain
//
module.exports = function(content, options) {
    return uglifyEs.minify(content, options === true ? null : options).code;
}

