define(["ihjs/extensions/apply"], ({loadExtensions, applyExtensions, applyExtensionsExcept}) => {

    loadExtensions({
        "HTMLElement": [
            "addClass", "appendElement", "appendElementTo", "attr", "css", "dataAttr", "find", "findAll", "forEachChild", "hasClass",
            "hideElement", "html", "off", "on", "overflownX", "overflownY", "removeAttr", "removeClass", "setFocus", "showElement", 
            "toggleClass", "trigger", "visible"
        ],
        "String": ["hashCode", "html", "dom", "toCamelCase", "createElement"]
    }).then(() => {
    
        applyExtensionsExcept("NodeList", "HTMLElement", ["find", "findAll"], true);
        applyExtensions("Document", ["on", "off", "trigger", "find", "findAll"]);
        applyExtensions("Window", ["on", "off", "trigger"]);

        require([
            "ihjs/app",
            "ihjs/view-manager/reveal",
            "ihjs/template/parser",
            "ihjs/view-manager/components"
        
        ], (_app, {reveal}) => {
        
                _app.import = m => new Promise(resolve => require([m], r => resolve(r)));
                _app.fetch = async (url, opts) => await(await fetch(url, opts)).json();
                _app.render = async (view, elementOrId, params) => await reveal({view: view, elementOrId: elementOrId, params: params});
                _app.parseQueryString = input => {
                    let i = input.slice(input.indexOf('?') + 1),
                        v = i.match(/[\w\d%\-!.~'()\*]+=[\w\d%\-!.~'()\*]+/g);
                    if (!v) {
                        return i;
                    }
                    return v.map(s => s.split('=').map(decodeURIComponent)).reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {});
                };
                _app.queryString = _app.parseQueryString (document.location.search);
            
                // require if current script tag is last
                _app.config.module && require([_app.config.module], app => {
                    app = (app.default || app);
                    if (typeof app === "function") {
                        app();
                    }
                });
        
            });
        });

});
