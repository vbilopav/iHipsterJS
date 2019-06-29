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

        config.version = config.version || getVersion(config.packageFile);
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
        if (!config.plugins.endsWith("/")) {
            config.plugins = config.plugins + "/";
        }
        config.appBundleModules = getCleanedArray(config.appBundleModules);
        config.appBundleDirs = getCleanedArray(config.appBundleDirs);
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
        getContentByOptions = (filename, options, isEntryPoint=false) => {
            if (!isEntryPoint) {
                return options ? minify(fs.readFileSync(filename).toString(), options) : fs.readFileSync(filename).toString();
            } 
            let content = fs.readFileSync(filename).toString().replace("/*dev*/dev: true,/*dev*/", "dev: false,");
            if (this.version) {
                content = content.replace(' /*version*/version: "",/*version*/', `version: "${this.version}",`);
            }
            return options ? minify(content, options) : content;
        }
        getContent = (filename, moduleName, isText=false) => {
            let options;
            if (isText) {
                options = null;
            } else {
                if (this.minifyModules[moduleName] !== undefined) {
                    options = this.minifyModules[moduleName];
                } else {
                    options = this.minifyDefault;
                }
            }
            return getContentByOptions(filename, options, moduleName===this.entryPointFile);
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
        loaderDir = path.dirname(this.loaderFile);

    log('>>> Writting module loader to bundle ...');
    fs.appendFileSync(
        bundleFile, 
        getContentByOptions(this.loaderFile, this.minifyLoader), 
        "utf8"
    );
    log();


    let 
        bundleContent = " require.config({_modules:{",
        hasBundles = false;

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
            if (!this.copyNonJsFiles) {
                continue;
            }
            log(">>> Copying file ", frameworkFile);
            mkDirByPathSync(dirNameClean);
            fs.copyFileSync(frameworkFile, fileNameClean);
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
            let 
                moduleName = moduleNameClean.replace(new RegExp("\\"+path.sep, 'g'), "/").replace(".js", "");
            if (moduleName.startsWith(this.plugins)) {
                moduleName = moduleName.replace(this.plugins, "");
            } else {
                moduleName = "ihjs/" + moduleName;
            }
            log('>>> Bundling module ...', moduleName);
            bundleContent = bundleContent + `'${moduleName}': [`;
            bundleContent = bundleContent + moduleContent.substring(moduleContent.indexOf("define(") + "define(".length, moduleContent.lastIndexOf(")"));
            bundleContent = bundleContent + '],';
            hasBundles = true;
        }
    }

    const additionalPaths = {};
    const buildAppModule = appModule => {
        let 
            sourceFileNameClean = cleanPath(path.join(this.appDir, appModule)),
            moduleName = path.join(this.moduleNamePrefix, appModule).replace(new RegExp("\\"+path.sep, 'g'), "/"),
            moduleNameClean,
            fileNameClean =  cleanPath(path.join(this.outputDir, appModule)),
            dirNameClean =  path.dirname(fileNameClean),
            isText = false,
            extname = path.extname(moduleName).toLowerCase();

        if (this.skipModules.includes(appModule)) {
            log(">>> Skipping module (reason: skipModules configuration)", moduleName);
            return;
        }

        if (extname === ".js") {
            moduleNameClean = moduleName.replace(".js", "");
        } else if (this.templateExtensions.includes(extname))  {
            moduleNameClean = "text!" + moduleName;
            isText = true;
        } else {
            log(">>> Skipping module (reason: unknown extension)", moduleName);
            return;
        }

        let 
            moduleContent = getContent(sourceFileNameClean, appModule, isText);

        if (this.lazyModules.includes(appModule)) {
            log(">>> Creating file ", fileNameClean);
            mkDirByPathSync(dirNameClean);
            fs.writeFileSync(fileNameClean, moduleContent, "utf8");
            additionalPaths[path.dirname(moduleName).replace(new RegExp("\\"+path.sep, 'g'), "/")] = 
                path.join(this.moduleNamePrefix, path.dirname(fileNameClean.replace(this.appDir, ""))).replace(new RegExp("\\"+path.sep, 'g'), "/");
        } else {
            log('>>> Bundling app module ...', moduleNameClean);
            bundleContent = bundleContent + `'${moduleNameClean}': [`;
            bundleContent = bundleContent + ( 
                isText ?
                ("'" + moduleContent.replace(/'/g, "\\'").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'")
                :
                moduleContent.substring(moduleContent.indexOf("define(") + "define(".length, moduleContent.lastIndexOf(")"))
            );
            bundleContent = bundleContent + '],';
            hasBundles = true;
        }
    };

    if (this.appDir) {

        for (let appModule of this.appBundleModules) {
            buildAppModule(appModule);
        }

        for (let appDir of this.appBundleDirs) {
            let 
                dirClean = cleanPath(path.join(this.appDir, appDir));

            for (let appFile of walkSync(dirClean)) {
                buildAppModule(appFile.full.replace(this.appDir, ""));
            }
        }

        if (!this.appBundleDirs.length && !this.appBundleModules.length) {
            let 
                dirClean = cleanPath(this.appDir);

            for (let appFile of walkSync(dirClean)) {
                buildAppModule(appFile.full.replace(this.appDir, ""));
            }
        }
    }

    if (hasBundles) {
        log('>>> Writing bundle content...');
        fs.appendFileSync(bundleFile, bundleContent + "}});", "utf8");
        log('>>> Done!');
        log();
    }

    if (Object.keys(additionalPaths).length) {
        log('>>> Writing additional paths ...', additionalPaths);
        fs.appendFileSync(bundleFile, "; require.config({paths:" + JSON.stringify(additionalPaths) + "});", "utf8");
        log('>>> Done!');
        log();
    }

    log('>>> Writing entry point ...');
    fs.appendFileSync(bundleFile, getContent(sourceFile, this.entryPointFile), "utf8");
    log('>>> Done!');
    log();
};

log('>>> STARTED');
log();
build.call(config);
log('>>> FINISHED');