(function () {
    try { 
        Function("() => {};"); 
        window.customElements.get("test");
    } catch(e) { throw "update your browser!"; }
    const
        defaults = {
            /*dev*/dev: true,/*dev*/
            /*version*/version: "",/*version*/
            urlArgs: undefined,
            appUrl: "/",
            libsUrl: null,
            appModule: null,
            appElementId: "app",
            appObjectName: "ihjs",
            loaderUrl: path => `${path}loader/loader.js`
        };

    const
        scr = document.currentScript || 
            document.querySelector("script[src*=ihjs]") || 
            document.querySelector("script[data-app-module]") || 
            document.querySelector("script[data-view-module]") || 
            document.querySelector("script[data-app-url]") || 
            document.querySelector("script:last-of-type");
    if (!scr) {
        throw new Error("Couldn't reference script tag. are you sure you've included script reference? ");
    }
    
    const
        dev = scr.getAttribute("data-dev") === null ? defaults.dev : eval(scr.getAttribute("data-dev")),
        version = scr.getAttribute("data-version") === null ? defaults.version : scr.getAttribute("data-version"),
        urlArgs = scr.getAttribute("data-url-args") === null ? defaults.urlArgs : scr.getAttribute("data-url-args"),
        sysUrl = scr.getAttribute("src").replace("ihjs.js", ""),
        viewModule = scr.getAttribute("data-view-module"),
        containerId = scr.getAttribute("data-app-container-id"),
        defaultElementId =  defaults.appElementId,
        appObjectName = scr.getAttribute("data-app-object-name") || defaults.appObjectName,
        settings = eval("(" + scr.getAttribute("data-settings") + ")") || {},
        loaderUrl = scr.getAttribute("data-loader-url") || defaults.loaderUrl(sysUrl),
        loadCssAlways = scr.getAttribute("data-load-css-always") === null ? true : ["true", "1", "yes"].includes(scr.getAttribute("data-load-css-always").toLowerCase());
    let
        appUrl = scr.getAttribute("data-app-url") === null ? defaults.appUrl : scr.getAttribute("data-app-url");

    const 
        relative = (from, to) => {
            if (!to.startsWith("/")) {
                to = "/" + to;
            }
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

    let 
        appModule = null,
        appModuleAttr = scr.getAttribute("data-app-module");
        
    if (appModuleAttr !== null) {
        appModule = appModuleAttr;
    } else {
        const 
            scripts = document.getElementsByTagName("script"),
            scriptsLength = scripts.length;
        if (scripts[scriptsLength - 1] === scr) {
            appModule = defaults.appModule;
        } else {
            for(let i = scriptsLength - 1; i >= 0; i--) {
                let currentScript = scripts[i];
                if (currentScript === scr) {
                    appModule = defaults.appModule;
                    break;
                }
                if (currentScript.src === "" && currentScript.innerHTML !== "" && currentScript.type === "module") {
                    break;
                }
            } 
        }
    }

    if (!appUrl.startsWith("/")) {
        appUrl = "/" + appUrl;
    }

    let 
        libsUrl = scr.getAttribute("data-libs-url") === null ? defaults.libsUrl : scr.getAttribute("data-libs-url");

    window[appObjectName] ={...(window[appObjectName] || {}), ...{
        dev: dev,
        version: version,
        appUrl: appUrl,
        sysUrl: sysUrl,
        settings: settings,
        config: {
            module: appModule,
            view: viewModule,
            containerId: containerId,
            defaultElementId: defaultElementId,
            name: appObjectName,
            loadCssAlways: loadCssAlways
        },
        relative: relative
    }};

    if (!libsUrl) {
        libsUrl = sysUrl.substring(0, sysUrl.indexOf("ihjs"));
    }
    window[appObjectName].libsUrl = libsUrl;

    const 
        sysPath = relative(appUrl, sysUrl),
        libsPath = relative(appUrl, libsUrl),
        loaderLoaded = () => window.require != undefined;
    
    const config = {
        urlArgs: urlArgs,
        baseUrl: window[appObjectName].appUrl,
        _ihjsObjName: appObjectName,
        paths: {
            libs: libsPath,
            "ihjs": sysPath,
            "text": sysPath + "/plugins/text",
            "template": sysPath + "/plugins/template",
            "template-functions": sysPath + "/plugins/template-functions",
            "cors-text": sysPath + "/plugins/cors-text",
            "cors-template": sysPath + "/plugins/cors-template"
        }
    }

    const 
        loadLoader = (src, onload) => {
            let script = document.createElement("script");
            script.async = true;
            script.src = src + (urlArgs ? "?" + urlArgs : "");
            script.onload = onload;
            script.onerror = onload;
            document.body.appendChild(script);
        },
        mainFunc = ()=>{};

    if (loaderLoaded()) {
        require.config(config);
        require(["ihjs/main"], mainFunc);
    } else {
        loadLoader(loaderUrl, () => {
            if (loaderLoaded()) {
                require.config(config);
                require(["ihjs/main"], mainFunc);
                return;
            }
            console.warn("Failed to load module loader.")
        });
    }

})();
