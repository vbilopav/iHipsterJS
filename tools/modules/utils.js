const fs = require("fs");
const path = require("path");

module.exports = {
    walkSync: function (dir, pathnames, filelist) {
        var 
            fs = fs || require('fs'),
            files = fs.readdirSync(dir);
        var
            filelist = filelist || [];
        if (pathnames) {
            pathnames = (pathnames instanceof Array ? pathnames : [pathnames]);
        }
        files.forEach(function (file) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = module.exports.walkSync(path.join(dir, file) + path.sep, pathnames, filelist);
            }
            else {
                if (!pathnames || !pathnames.length || pathnames.indexOf(path.extname(file)) !== -1) {
                    filelist.push({
                        file: file, 
                        dir: dir, 
                        full: path.join(dir, file)
                    });
                }
            }
        });
        return filelist;
    },
    rmdirSync: pathName => {
        var 
            fs = fs || require('fs');
        if (fs.existsSync(pathName)) {
            fs.readdirSync(pathName).forEach(function (file, index) {
                var curPath = pathName + path.sep + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    module.exports.rmdirSync(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(pathName);
        }
    },
    mkDirByPathSync: (targetDir, oncreate) => {
        const
            isRelativeToScript = false,
            sep = path.sep,
            initDir = path.isAbsolute(targetDir) ? sep : '',
            baseDir = isRelativeToScript ? __dirname : '.';
        targetDir.split(sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(baseDir, parentDir, childDir);
            if (!fs.existsSync(curDir)) {
                oncreate && oncreate(curDir);
                fs.mkdirSync(curDir + path.sep);
            }
            return curDir;
        }, initDir);
    },
    cleanPath: name => name.replace(/[\\/]/g, path.sep),
    readConfig: name => eval(fs.readFileSync(name).toString()),
    templateStr: (s, o) => (s.indexOf("$") !== -1 ? new Function("return `" + s + "`;").call(o) : s),
    getTimeStamp: () => {
        let date = new Date();
        return (
            date.getFullYear() + "-" + 
            ("0" + (date.getMonth() + 1).toString()).slice(-2) + "-" + 
            ("0" + date.getDate().toString()).slice(-2) + " " + 
            ("0" + (date.getHours()).toString()).slice(-2) + ":" + 
            ("0" + date.getMinutes().toString()).slice(-2) + ":" + 
            ("0" + date.getSeconds().toString()).slice(-2) + ":" + 
            (date.getMilliseconds().toString())
        )
    }
}

