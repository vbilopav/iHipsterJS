(function () {

    const
        defaults = {
            version: "",
            appUrl: "/",
            libsUrl: null,
            appModule: "$/single-view-app",
            appElementId: "app",
            appObjectName: "_app",
            loaderUrl: path => `${path}loader/loader.js`
        }

    const 
        relative = (from, to) => {
            const 
                normalizeArray = (parts, allowAboveRoot) => {
                    let res = [];
                    for (let i = 0; i < parts.length; i++) {
                        let p = parts[i];

                        // ignore empty parts
                        if (!p || p === '.') {
                            continue;
                        }

                        if (p === '..') {
                            if (res.length && res[res.length - 1] !== '..') {
                                res.pop();
                            } else if (allowAboveRoot) {
                                res.push('..');
                            }
                        } else {
                            res.push(p);
                        }
                    }
                    return res;
                },
                resolve = function() {
                    let resolvedPath = '', resolvedAbsolute = false;
                    for (let i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                        let path = (i >= 0) ? arguments[i] : "";
                        resolvedPath = path + '/' + resolvedPath;
                        resolvedAbsolute = path[0] === '/';
                    }
                    resolvedPath = normalizeArray(resolvedPath.split('/'), !resolvedAbsolute).join('/');
                    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
                };

            from = resolve(from).substr(1);
            to = resolve(to).substr(1);
            let fromParts = from.split('/').filter(e => e.length !== 0);
            let toParts = to.split('/').filter(e => e.length !== 0);
            let length = Math.min(fromParts.length, toParts.length);
            let samePartsLength = length;
            for (let i = 0; i < length; i++) {
                if (fromParts[i] !== toParts[i]) {
                    samePartsLength = i;
                    break;
                }
            }
            let outputParts = [];
            for (let i = samePartsLength; i < fromParts.length; i++) {
                outputParts.push('..');
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join('/');
        };

    const
        scr = document.currentScript || document.querySelector("script[type=module]");
    if (!scr) {
        throw new Error("Couldn't reference script tag. are you sure you've included script reference? ");
    }
    const
        dev = scr.getAttribute("data-dev") === null ? true : eval(scr.getAttribute("data-dev")),
        version = scr.getAttribute("data-version") === null ? defaults.version : scr.getAttribute("data-version"),
        appUrl = scr.getAttribute("data-app-url") === null ? defaults.appUrl : scr.getAttribute("data-app-url"),
        sysUrl = scr.getAttribute("src").replace("ihjs.js", ""),
        appModule = scr.getAttribute("data-app-module") === null ? defaults.appModule : scr.getAttribute("data-app-module"),
        viewModule = scr.getAttribute("data-view-module"),
        appElementId = scr.getAttribute("data-app-container-id") === null ? defaults.appElementId : scr.getAttribute("data-app-container-id"),
        appObjectName = scr.getAttribute("data-app-object-name") || defaults.appObjectName,
        settings = eval("(" + scr.getAttribute("data-settings") + ")") || {},
        cssFilesattrValue = scr.getAttribute("data-css-files"),
        loaderUrl = scr.getAttribute("data-loader-url") || defaults.loaderUrl(sysUrl);

    if (!appUrl.startsWith("/")) {
        appUrl = "/" + appUrl;
    }

    let 
        libsUrl = scr.getAttribute("data-libs-url") === null ? defaults.libsUrl : scr.getAttribute("data-libs-url");

    window[appObjectName] = {
        dev: dev,
        version: version,
        appUrl: appUrl,
        sysUrl: sysUrl,
        settings: settings,
        config: {
            module: appModule,
            view: viewModule,
            elementId: appElementId,
            name: appObjectName
        },
        relative: relative
    };

    if (!libsUrl) {
        libsUrl = sysUrl.substring(0, sysUrl.indexOf("ihjs"));
    }
    window[appObjectName].libsUrl = libsUrl;

    const 
        sysPath = relative(appUrl, sysUrl),
        libsPath = relative(appUrl, libsUrl);

    if (window[appObjectName].version) {
        window.require.urlArgs = "v=" + window[appObjectName].version;
    }

    const
        cssFiles = cssFilesattrValue !== null ? eval("[" + cssFilesattrValue + "]") : [];
        
    if (cssFiles.length) {
        for (let i=0, l=cssFiles.length; i<l; i++) {
            let script = document.createElement("link");
            script.rel  = 'stylesheet';
            script.type = 'text/css';
            script.href = cssFiles[i] + (version ? "?" + require.urlArgs : "");
            script.media = 'all';
            document.head.appendChild(script);
        }
    }

    const 
        loaderLoaded = () => window.AMDLoader != undefined;
    window.require = {
        baseUrl: window[appObjectName].appUrl,
        __appObjName: appObjectName,
        paths: {
            libs: libsPath,
            "$": sysPath,
            "$text": sysPath + "/plugins/text",
            "$template": sysPath + "/plugins/template",
            "$document": sysPath + "/plugins/document",
            "$composite": sysPath + "/plugins/composite",
            "$cors-text": sysPath + "/plugins/cors-text",
            "$cors-template": sysPath + "/plugins/cors-template",
            "$extension": sysPath + "/plugins/extension"
        }
    }

    const 
        loadLoader = (src, onload) => {
            let script = document.createElement("script");
            script.async = true;
            script.src = src;
            document.body.appendChild(script);
            script.onload = onload;
            script.onerror = onload;
        };

    if (loaderLoaded()) {
        require(["$/main"], ()=>{});
    } else {
        loadLoader(loaderUrl, () => {
            if (loaderLoaded()) {
                require(["$/main"], ()=>{});
                return;
            }
            console.warn("Failed to load module loader.")
        });
    }

})();
