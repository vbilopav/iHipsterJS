define(["ihjs/app"], app => {

    const 
        error = "Couldn't find any suitable template to initialize application. There are no template tags without id and attribute data-view-module is not set!",
        getElement = templates => {
            if (app.config.containerId) {
                element = document.getElementById(app.config.containerId);
            } else {
                element = document.getElementById(app.config.defaultElementId);
            }
            if (!element) {
                // remember templates because rendering into body removes everything
                if (templates) {
                    _app.config.__templates = new Map(Array.from(templates).map(e => { 
                        return [e.id, {
                            html: e.html(),
                            data: e.dataset
                        }] 
                    }));
                }
                // render into body if container not defined and default not found
                element = document.body;
            }
            return element;
        };
    
    // element to render app to 
    let element;
    // all templates in document
    let templates = document.getElementsByTagName("template");

    for (let template of templates) {
        if (template.dataset.route) {
            require(["ihjs/spa/document"], spa => spa(templates, getElement()));
            return;
        }
    }

    // default view isn't defined
    if (!app.config.view) { 
        // document doesn't contain templates
        if (!templates.length) { 
            throw new Error(error);
        } else {

            // find last (closest to the bottom of document) template without id, otherwise raise error
            let template, found = false;
            for (let i = templates.length-1; i >=0; i--) {
                template = templates[i];
                
                // template found
                if (!template.id) {
                    template.id = _app.config.name;
                    app.config.view = "template!" + _app.config.name;
                    found = true;
                    break;
                }
            }
            // no template found
            if (!found) {
                throw new Error(error);
            }
            element = getElement(templates);
        }
    } else {
        element = getElement();
    }

    return app.render(
        app.config.view, 
        element,
        Object.assign({}, app.queryString)
    );
});
