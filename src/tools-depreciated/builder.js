const uglifyEs = require("uglify-es");
const os = require("os");
const {
    walkSync, 
    rmdirSync, 
    mkDirByPathSync, 
    cleanPath, 
    fs, 
    path
} = require("./fs");

const getVersion = () => {
    try {
        let contents = fs.readFileSync("../ihjs/package.json");
        let jsonContent = JSON.parse(contents);
        return jsonContent.version;
    } catch(error) {
        return "";
    }
}
const version = getVersion();

class Builder {

    constructor (sourceDir) {
        this.sourceDir = cleanPath(sourceDir);
        this.minDir = null;
    }

    buildMin(minDir) {
        this.minDir = cleanPath(minDir.replace("version", version));
        
        console.log(`>>> Removing min dir ${this.minDir}`);
        rmdirSync(this.minDir);
        for (let item of walkSync(this.sourceDir)) {
            let dirName = cleanPath(item.dir).replace(this.sourceDir, this.minDir),
                fileName = cleanPath(item.full).replace(this.sourceDir, this.minDir);
        
            mkDirByPathSync(dirName);
            console.log(`>>> Minifying ${item.full} to ${fileName} ...`);
            let content = uglifyEs.minify(fs.readFileSync(item.full).toString(), null);
            fs.writeFileSync(fileName, content.code, "utf8");
        }
    }

    buildBundle({
        bundleDir, entryPoint="main", pluginsPath="plugins", indexModule="ihjs", sysPath="sys", useMin=true, skip=[]
    }) {

        if (!this.minDir) {
            throw new Error("buildMin(dir) must be called first")
        }

        const isEntryPoint = id => id === (sysPath + "/" + entryPoint);
        const isIndex = id => id === (sysPath + "/" + indexModule);
        const sourceDir = (useMin ? this.minDir : this.sourceDir)

        const getModuleId = fullName => {
            let parsed = path.parse(fullName.replace(sourceDir, ""));
            if (parsed.dir.startsWith(pluginsPath)) {
                return parsed.name;
            }
            return sysPath + "/" + (parsed.dir ? parsed.dir.replace(path.sep, "/") + "/" : "") + parsed.name;
        }

        const shouldSkip = id => skip.includes(id);

        this.bundleDir = cleanPath(bundleDir.replace("version", version));
        console.log(`>>> Removing min dir ${this.bundleDir}`);
        rmdirSync(this.bundleDir);
        mkDirByPathSync(this.bundleDir);
        let content = "", 
            modules = [],
            entryPointContent,
            indexContent,
            bundleFile;
        
        for (let item of walkSync(sourceDir)) {
            let moduleId = getModuleId(item.full);
  
            if (shouldSkip(moduleId)) {
                let dirName = cleanPath(item.dir).replace(sourceDir, this.bundleDir),
                    fileName = cleanPath(item.full).replace(sourceDir, this.bundleDir);
                mkDirByPathSync(dirName);
                console.log(`>>> Copying ${item.full} to ${fileName}...`);
                fs.copyFileSync(item.full, fileName);
                continue;
            }

            if (isEntryPoint(moduleId)) {

                entryPointContent = fs.readFileSync(item.full).toString();
                entryPointContent =  entryPointContent.replace("define(", "define('" + moduleId + "',");

            } else if (isIndex(moduleId)) {

                indexContent = fs.readFileSync(item.full).toString();
                bundleFile = cleanPath(item.full).replace(sourceDir, this.bundleDir);

            } else {

                let moduleContent = fs.readFileSync(item.full).toString();
                content += moduleContent.replace("define(", "define('" + moduleId + "',");
                modules.push(moduleId);
            }
            
        }
        
        let open = entryPointContent.indexOf('['),
            close = entryPointContent.indexOf(']') + 1,
            entryPointModules = eval(entryPointContent.substring(open, close));
        for (let m of modules) {
            if (!entryPointModules.includes(m)) {
                entryPointModules.push(m);
            }
        }
        entryPointContent = 
            entryPointContent.substring(0, open) + 
            "[" + 
            entryPointModules.map(m => "'" + m + "'").join(",") + 
            "]" +
            entryPointContent.substring(close, entryPointContent.length);
        content += entryPointContent;

        indexContent = 
            "/* ihjs " + version + " */" + os.EOL + indexContent.replace("const configure=()=>{}", "const configure=()=>{" + content + "}");
        
        console.log(`>>> Creating bundle ${bundleFile}...`);
        fs.writeFileSync(bundleFile, indexContent, "utf8");
    }
}

module.exports = Builder

