define([
    "ihjs/view-manager/utils", 
    "ihjs/app",
    "ihjs/template/css"
], (
    utils,
    app,
    cssHelper

) => {

    const 
        _cssImported = cssHelper.getImported(),
        reveal = ({
            id="", 
            view=(()=>{throw view})(), 
            params={}, 
            uri="", 
            elementOrId=(()=>{throw elementOrId})()
        }) => new Promise(resolve => {
        
            let 
                viewName, modules;
            if (typeof view === "string") {
                viewName = view;
                modules = [view]
            } else if (typeof view === "object" && view.name) {
                viewName = view.name;
                modules = [viewName];
                if (view.inject) {
                    modules.push(...view.inject);
                }
            } else {
                modules = [];
            }

            if (elementOrId.dataset && !params.__noDataset) {
                for(let [name, value] of Object.entries(elementOrId.dataset)) {
                    name = ("data-" + name).toCamelCase();
                    if (params[name]) {
                        throw "ambiguous parameter " + name;
                    }
                    params[name] = value;
                }
                delete params.__noDataset;
            }

            const resolveModules = (view, ...injected) => {
                if (view.default && view.__esModule) {
                    view = view.default;
                };
                
                let 
                    type = utils.getViewType(view, viewName);

                const renderView = () => {
                    const 
                        uriHash = uri.hashCode(),
                        element = (typeof elementOrId === "string" ? "span".createElement(elementOrId) : elementOrId),
                        data = {type: type, uriHash: uriHash, x: 0, y: 0, id: id};
                    if (id) {
                        element.dataset.id = id;
                    }
                    const
                        resolveView = () => {
                            const 
                                contentFunc = c => {
                                    if (typeof c === "function" || c instanceof Array) {
                                        c = app.parse(...c);
                                        c.then(s => {
                                            if (typeof s === "string") {
                                                element.html(s);
                                            } else {
                                                element.html("").appendChild(s);
                                            }
                                            utils.moduleRendered(data.instance, {params: params, element: element});
                                        })
                                    } else if (typeof c === "string" || c instanceof HTMLElement) {
                                        if (typeof c === "string") {
                                            element.html(c);
                                        } else {
                                            element.html("").appendChild(c);
                                        }
                                        utils.moduleRendered(data.instance, {params: params, element: element});
                                    }
                                };
    
                            if (type === utils.types.class || type === utils.types.object) {
                                let content = data.instance.render({params: params, element: element});
                                if (typeof content === "function" || content instanceof Array) {
                                    if (typeof content === "function") {
                                        content = app.parse(content);
                                    } else {
                                        content = app.parse(...content);
                                    }
                                }
                                if (content instanceof Promise) {
                                    return content.then(s => {
                                        contentFunc(s);
                                        return resolve({data, element});
                                    });
                                } else {
                                    contentFunc(content);
                                    return resolve({data, element});
                                }
                            } else {
                                return resolve({data, element});
                            }
                        }

                    if (type === utils.types.string) {
                        data.element = element.html(view);
                        return resolveView();
                    }
                    
                    if (type === utils.types.template) {
                        data.instance = view;
                        const 
                            result = view(params, {injected: injected});
                        view.__params = params;
                        if (typeof result === "string") {
    
                            element.html(result);
                            utils.templateRendered(params, element);
            
                        } else if (result instanceof HTMLElement) {
            
                            element.html("").appendChild(result);
                            utils.templateRendered(params, element);
    
                        } else if (result instanceof Promise) {
            
                            result.then(r => {
                                
                                if (typeof r === "string") {
                                    element.html(r);
                                } else {
                                    element.html("").appendChild(r);
                                }
                                utils.templateRendered(params, element);
            
                            });
                        }

                        return resolveView();
                    }
                    
                    if (type === utils.types.class || type === utils.types.object) {
                        const
                            options = {
                                disableCaching: false,
                                callRenderOnlyOnce: false,
                                css: []
                            };
                        if (type === utils.types.class) {
                            data.instance = new view({id: id, element: element, options: options}, ...injected);
                        } else {
                            data.instance = view;
                        }
                        
                        data.instance._options = options;
                        if (!cssHelper.shouldLoad()) {
                            return resolveView();
                        }
                        
                        if (options.css && typeof options.css === "string") {
                            options.css = [options.css];
                        }
                        if (options.css && options.css.length) {
                            options.css = options.css.filter(value => !_cssImported.includes(value));
                        }
                        if (options.css && options.css.length) {
    
                            let links = [], texts = [];
                            options.css.forEach(l => {
                                if (!l.startsWith("text!")) {
                                    links.push(cssHelper.addLink(l));
                                } else {
                                    texts.push(l);
                                }
                            });
                            Promise.all(links).then(() => {
                                if (texts.length) {
                                    require(texts, (...results) => {
                                        cssHelper.addContent(results);
                                        return resolveView();
                                    });
                                } else {
                                    return resolveView();
                                }
                            });
    
                            _cssImported.push(...options.css);
    
                        } else {
                            return resolveView();
                        }
                    }
                }
                if (type === utils.types.promise) {
                    view.then(viewResult => {
                        view = viewResult;
                        type = utils.getViewType(view, viewName);
                        renderView();
                    });
                } else {
                    renderView();
                }
            };
            if (view && !modules.length) {
                resolveModules(view);
            } else {
                require(modules, resolveModules);
            }

        });

    return { reveal }
});
