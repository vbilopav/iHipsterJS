const uglifyEs = require("uglify-es");
const os = require("os");
const {
    walkSync, 
    rmdirSync, 
    mkDirByPathSync, 
    cleanPath, 
    fs, 
    path,
    readConfig,
    getVersion,
    templateStr
} = require("./utils");

class Builder {
    constructor() {
        this.config = readConfig("./build-config.js");
        this.config.version = getVersion();
        for (let [key, value] of Object.entries(this.config)) {
            if (typeof value === "string") {
                let tmpValue = templateStr(value, this.config);
                if (key.endsWith("Dir") || key.endsWith("Path")) {
                    tmpValue = cleanPath(tmpValue);
                }
                this.config[key] = tmpValue;
            }
        }


        console.log("config:");
        console.log(this.config);
    }
}

new Builder();
