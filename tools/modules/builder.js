const os = require("os");
const fs = require("fs");
const path = require("path");
const {
    walkSync, 
    rmdirSync, 
    mkDirByPathSync, 
    cleanPath, 
    readConfig,
    getVersion,
    templateStr
} = require("./utils");
const minify = require("./minifier");

const getConfig = function() {
    const config = readConfig("./build-config.js");
    config.version = getVersion();
    for (let [key, value] of Object.entries(config)) {
        if (typeof value === "string") {
            let tmpValue = templateStr(value, config);
            if (key.endsWith("Dir") || key.endsWith("Path")) {
                tmpValue = cleanPath(tmpValue);
            }
            config[key] = tmpValue;
        }
    }
    return config;
};

const config = getConfig();

const log = function() {
    if (!config.verbose) {
        return
    }
    console.log(...arguments);
}

const buildOutputDir = function() {
    log(`>>> Removing min dir ${this.outputDir}`);
    rmdirSync(this.outputDir);

    for (let sourceItem of walkSync(this.sourceDir)) {
        const 
            dirName = cleanPath(sourceItem.dir).replace(this.sourceDir, this.outputDir),
            fileName = cleanPath(sourceItem.full).replace(this.sourceDir, this.outputDir),
            moduleName = sourceItem.full.replace(this.sourceDir, "");

        log(moduleName);

        if (path.extname(sourceItem.full) !== ".js") {
            continue;
        }

        //mkDirByPathSync(dirName, log);

        //log(`>>> Minifying "${sourceItem.full}" to "${fileName}" ...`);
        //let content = minify.call(this, sourceItem.full, fileName, log);
        
        //fs.writeFileSync(fileName, content.code, "utf8");
    }
};


buildOutputDir.call(config);
