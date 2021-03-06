define([], ()  => {

    const Model = ihjs.Model;
    
    const 
        isTemplate = (name, view) => ((name && name.indexOf("template!") !== -1) || (view && (view._isTemplate || view.toString().indexOf("parseTemplate") !== -1))),
        types = {template: 1, class: 2, string: 3, promise: 4, object: 5},
        getViewType = (view, name) => {
            if (view instanceof Promise) {
                return types.promise;
            }
            let t = typeof view;
            if (t === "function") {
                if (isTemplate(name, view)) {
                    return types.template;
                }
                return types.class;
            }
            if (t === "string") {
                return types.string;
            }
            if (t === "object" && view.render) {
                return types.object;
            }
            throw new Error("unknown view type " + view);
        },
        templateRendered = (params, element, revealed=false) => {
            if (params.model === undefined || (params.model && !(params.model instanceof Model))) {
                params.model = new Model({model: params.model}).bind(element, params, params, revealed ? null : params.context);
            }
            revealed || params.template.rendered && params.template.rendered(element);
            revealed && params.template.revealed && params.template.revealed(element);
            params.template.shown && params.template.shown(element);
        },
        moduleRendered = (instance, args, revealed=false) => {
            if (instance._options.model === undefined || (instance._options.model && !(instance._options instanceof Model))) {
                instance.model = new Model({model: instance._options.model}).bind(args.element, instance, instance, revealed ? null : instance._options.context || instance.context);
            }
            revealed || instance.rendered && instance.rendered({params: args.params, element: args.element});
            revealed && instance.revealed && instance.revealed({params: args.params, element: args.element});
            instance.shown && instance.shown({params: args.params, element: args.element});
        }

    return {
        
        types,
        getViewType,
        templateRendered,
        moduleRendered,
        isTemplate

    }

});
