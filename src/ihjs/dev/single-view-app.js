define(["$/app"], app => {

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
                    _app.config.__templates = new Map(Array.from(templates).map(e => [e.id, e.html()]));
                }
                // render into body if container not defined and default not found
                element = document.body;
            }
            return element;
        };
    
    // element to render app to 
    let element;

    // default view isn't defined
    if (!app.config.view) { 
        let templates = document.getElementsByTagName("template");

        // document doesn't contain templates
        if (!templates.length) { 
            throw new Error(error);
        } else {

            // find last (closest to the bottom of document) template wihtout id, otherwise raise error
            let template;
            for (let i = templates.length-1; i >=0; i--) {
                template = templates[i];
                
                // template found
                if (!template.id) {
                    template.id = _app.config.name;
                    app.config.view = "$template!" + _app.config.name;
                    break;
                }
            }
            // no template found
            if (!template) {
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
