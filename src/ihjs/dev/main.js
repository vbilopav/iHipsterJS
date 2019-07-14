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
            "ihjs/template/parser"

        ], (ihjs, {reveal}) => {
        
                ihjs.import = m => new Promise(resolve => require([m], r => resolve(r)));
                ihjs.fetch = async (url, opts) => await(await fetch(url, opts)).json();
                ihjs.render = async (view, elementOrId, params) => await reveal({view: view, elementOrId: elementOrId, params: params});
                ihjs.parseQueryString = input => {
                    let i = input.slice(input.indexOf('?') + 1),
                        v = i.match(/[\w\d%\-!.~'()\*]+=[\w\d%\-!.~'()\*]+/g);
                    if (!v) {
                        return i;
                    }
                    return v.map(s => s.split('=').map(decodeURIComponent)).reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {});
                };
                ihjs.queryString = ihjs.parseQueryString (document.location.search);

                const 
                    getDefaultElement = () => {
                        let e;
                        if (ihjs.config.containerId) {
                            e = document.getElementById(ihjs.config.containerId);
                        } else {
                            e = document.getElementById(ihjs.config.defaultElementId);
                        }
                        if (!e) {
                            e = document.body;
                        }
                        return e;
                    },
                    templates = document.getElementsByTagName("template");

                // remember templates because rendering into body removes everything
                ihjs.config.__templates = new Map();

                let spa, components;
                (async () => {
                    for (let template of templates) {
                        ihjs.config.__templates.set(template.id, {html: template.html(), data: template.dataset});
                        if (template.dataset.route) {
                            if (!spa) {
                                spa = await ihjs.import("ihjs/spa/document");
                            }
                            await spa.addView(template);
                        }
                        if (template.dataset.tag) {
                            if (!components) {
                                components = await ihjs.import("ihjs/components");
                            }
                            components.addElement(template);
                        }
                    }
                    if (components) {
                        await components.resolveElements();
                    }
                })().then(() => {
                    if (spa) {
                        spa.resolveViews(getDefaultElement());
                        return;
                    }
                    if (ihjs.config.module) {
                        require([ihjs.config.module], app => {
                            app = (ihjs.default || app);
                            if (typeof app === "function") {
                                app();
                            }
                        });
                        return;
                    } else {
                        let element;
                        // default view isn't defined
                        if (!ihjs.config.view) { 

                            // find last (closest to the bottom of document) template without id, otherwise raise error
                            let template, found = false;
                            for (let i = templates.length-1; i >=0; i--) {
                                template = templates[i];
                                
                                if (template.id || template.dataset.route || template.dataset.tag) {
                                    continue;
                                }
                                // template found
                                template.id = ihjs.config.name;
                                ihjs.config.view = "template!" + ihjs.config.name;
                                found = true;
                                element = getDefaultElement();
                                break;
                            }
                        
                        } else {
                            element = getDefaultElement();
                        }
                        if (ihjs.config.view) {
                            return ihjs.render(
                                ihjs.config.view, 
                                element,
                                Object.assign({}, ihjs.queryString)
                            );
                        }
                    }
                });
            });
        });
});
