define(["ihjs/models/model"], Model  => {

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
        showView = item => {
            window.scrollTo(item.x, item.y);
        },
        templateRendered = (params, element, revealed=false) => {
            if (revealed) {
                params.model = undefined;
            }
            if (params.model === undefined || (params.model && !(params.model instanceof Model))) {
                params.model = new Model({model: params.model}).bind(element, params, params);
            }
            params.template.rendered && params.template.rendered({element, revealed});
            revealed && params.template.revealed && params.template.revealed(element);
        },
        moduleRendered = (instance, args, revealed=false) => {
            if (instance._options.context === undefined) {
                instance._options.context = instance;
            }
            if (instance._options.model !== null && instance._options.model instanceof Model === false && (instance._options.context || instance._options.model)) {
                instance.model = new Model({model: instance._options.model}).bind(args.element, instance._options.context);
            }
            instance.rendered && instance.rendered({params: args.params, element: args.element, revealed});
            revealed && instance.revealed && instance.revealed({params: args.params, element: args.element});
        }

    return {
        
        types,
        getViewType,
        showView,
        templateRendered,
        moduleRendered,
        isTemplate

    }

});
