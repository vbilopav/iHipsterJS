define(["ihjs/models/model"], Model  => {

    const 
        isTemplate = (name, view) => ((name && name.indexOf("template!") !== -1) || (view && view.toString().indexOf("parseTemplate") !== -1)),
        prefix = "_view",
        getId = uriHash => prefix + "-" + uriHash,
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
        templateRendered = (params, element) => {
            if (params.template.model === undefined || (params.template.model && !(params.template.model instanceof Model))) {
                params.template.model = new Model({model: params.template.model}).bind(element, params.template.modelContext || params.template, params);
            }
            if (params.template.rendered) {
                params.template.rendered(element);
            }
        },
        moduleRendered = (instance, args, skipChange=true) => {
            if (instance._options.context === undefined) {
                instance._options.context = instance;
            }
            if (instance._options.model !== null && instance._options.model instanceof Model === false && (instance._options.context || instance._options.model)) {
                instance.model = new Model({model: instance._options.model}).bind(args.element, instance._options.context);
            }
            if (skipChange)  {
                !instance.rendered || instance.rendered({params: args.params, element: args.element});
            } else {
                if (instance.changed) {
                    instance.changed({params: args.params, element: args.element});
                } else if (instance.rendered) {
                    instance.rendered({params: args.params, element: args.element});
                }
            }
        }

    return {

        getId,
        types,
        getViewType,
        showView,
        templateRendered,
        moduleRendered,
        isTemplate

    }

});
