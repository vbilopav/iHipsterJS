if (process.argv.indexOf("--help") !== -1 || process.argv.indexOf("-h") !== -1 || process.argv.indexOf("help") !== -1 || process.argv.indexOf("h") !== -1) {
    console.log(
    `

    Usage: 
    node build [configuration file name]

    Default configuration:
    default-config.js

    `)
    return;
}

const os = require("os");
const fs = require("fs");
const path = require("path");
const {
    walkSync, 
    rmdirSync, 
    mkDirByPathSync, 
    cleanPath, 
    readConfig,
    templateStr,
    getTimeStamp
} = require("./utils");
const minify = require("./minifier");

let configName;
if (process.argv.length === 3) {
    configName = process.argv[2];
} else {
    configName = "config.js";
}
console.log("Configuration file -> " + configName);
console.log("Run node build help for help... ");

const 
    getVersion = packageFile => {
        try {
            let contents = fs.readFileSync(packageFile);
            let jsonContent = JSON.parse(contents);
            return jsonContent.version;
        } catch(error) {
            console.warn(error);
            return "";
        }
    },
    getCleanedObject = obj => {
        let result = {};
        for (let [key, value] of Object.entries(obj)) {
            result[cleanPath(key)] = value;
        }
        return result;
    },
    getCleanedArray = arr => {
        let result = [];
        for (let value of arr) {
            result.push(cleanPath(value));
        }
        return result;
    },
    getConfig = function() {
        const 
            configValue = readConfig(configName),
            defaults =  readConfig("defaults.js"),
            config = {...defaults, ...configValue};

        config.version = getVersion(config.packageFile);
        config.timestamp = getTimeStamp();
        for (let [key, value] of Object.entries(config)) {
            if (typeof value === "string") {
                let tmpValue = templateStr(value, config);
                if (key.endsWith("Dir") || key.endsWith("Path") || key.endsWith("File")) {
                    tmpValue = cleanPath(tmpValue);
                }
                config[key] = tmpValue;
            }
        }
        config.minifyModules = getCleanedObject(config.minifyModules);
        config.lazyModules = getCleanedArray(config.lazyModules);
        config.skipModules = getCleanedArray(config.skipModules);
        return config;
    },
    config = getConfig(),
    log = function() {
        if (!config.verbose) {
            return
        }
        if (!arguments.length) {
            console.log('');
        } else {
            let args = [getTimeStamp()].concat(...arguments);
            console.log(...args);
        }
    },
    isSameDir = (dir1, dir2) => dir1 === dir2 || dir1 + path.sep === dir2 || dir1 === dir2 + path.sep || dir1 + path.sep === dir2 + path.sep;


const build = function() {
    const 
        getContentByOptions = (filename, options) => {
            if (!options) {
                return fs.readFileSync(filename).toString();
            } else {
                return minify(fs.readFileSync(filename).toString(), options);
            }
        }
        getContent = (filename, moduleName) => {
            let options;
            if (this.minifyModules[moduleName] !== undefined) {
                options = this.minifyModules[moduleName];
            } else {
                options = this.minifyDefault;
            }
            return getContentByOptions(filename, options);
        };

    log('>>> Recreating output directory', this.outputDir);
    rmdirSync(this.outputDir);
    mkDirByPathSync(this.outputDir);
    log('>>> Done!');
    log();

    const 
        sourceFile = path.join(this.frameworkDir, this.entryPointFile),
        bundleFile = path.join(this.outputDir, this.bundleFile);

    if (this.bundleComment) {
        log('>>> Writting bundle comment header ...');
        fs.appendFileSync(bundleFile, "/*".concat(this.bundleComment).concat("*/\n"), "utf8");
    }

    const
        loaderDir = path.dirname(this.loaderFile),
        //loaderContet = "(function () {" + getContentByOptions(this.loaderFile, this.minifyLoader) + "}).call(window);";
        loaderContet = getContentByOptions(this.loaderFile, this.minifyLoader);

    log('>>> Writting module loader to bundle ...');
    fs.appendFileSync(bundleFile, loaderContet, "utf8");
    log();

    for (let frameworkItem of walkSync(this.frameworkDir)) {
        const 
            frameworkDir = cleanPath(frameworkItem.dir),
            frameworkFile = cleanPath(frameworkItem.full),
            dirNameClean = frameworkDir.replace(this.frameworkDir, this.outputDir),
            fileNameClean = frameworkFile.replace(this.frameworkDir, this.outputDir),
            moduleNameClean = cleanPath(frameworkFile.replace(this.frameworkDir, ""));

        if (isSameDir(loaderDir, frameworkDir)) {
            continue;
        }

        if (path.extname(frameworkItem.full).toLowerCase() !== ".js") {
            continue;
        }

        if (this.skipModules.includes(moduleNameClean)) {
            continue;
        }

        if (frameworkFile == sourceFile) {
            continue;
        }

        let 
            moduleContent = getContent(frameworkFile, moduleNameClean);
        if (this.lazyModules.includes(moduleNameClean)) {
            log(">>> Creating file ", fileNameClean);
            mkDirByPathSync(dirNameClean);
            fs.writeFileSync(fileNameClean, moduleContent, "utf8");
        } else {
            const 
                moduleName = "$/" + moduleNameClean.replace(new RegExp("\\"+path.sep, 'g'), "/").replace(".js", "");
            if (!moduleContent.endsWith(";")) {
                moduleContent = moduleContent + ";";
            }
            log('>>> Bundling module ...', moduleName);
            fs.appendFileSync(bundleFile, moduleContent.replace("define([", "define('" + moduleName + "',["), "utf8");
        }
    
    }

    const 
        entryPointContent = getContent(sourceFile, this.entryPointFile);
    
    fs.appendFileSync(bundleFile, entryPointContent, "utf8");
};

log('>>> STARTED');
log();
build.call(config);
