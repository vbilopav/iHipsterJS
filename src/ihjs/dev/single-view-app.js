define(
    ["$/app"], app => 
        id => {
            let element;
            if (!app.config.view) {
                let templates = document.getElementsByTagName("template");
                if (!templates.length) {
                    throw new Error("Couldn't find any appropriate template to initialize application. There are no template tags and attribute data-view-module is not set!");
                } else {
                    let template = templates[templates.length-1];
                    template.id = _app.config.name;
                    app.config.view = "$template!" + _app.config.name;
                    element = template.parentElement;
                }
            } else if (app.config.view.startsWith("$template!") && (!id || id==="app")) {
                let getElement = () => {
                    id = app.config.view.replace("$template!", "");
                    return (document.getElementById(id) || document.getElementsByName(id)).parentElement;
                }
                if (!id) {
                    element = getElement();
                } else {
                    element = document.getElementById(id);
                    if (!element) {
                        id = app.config.view.replace("$template!", "");
                        element = getElement();
                    }
                }
                
            } else {
                element = document.getElementById(id).html("");
            }
            return app.render(
                app.config.view, 
                element,
                Object.assign({}, app.queryString)
            );
        }
);
