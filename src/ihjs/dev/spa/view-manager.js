define([

    "ihjs/view-manager/utils", 
    "ihjs/view-manager/reveal",
    "ihjs/app"

], (
    utils, 
    {reveal},
    app
) => class {

    constructor(
        container=(()=>{throw container})()
    ) {
        this._container = container;
        this._views = {} //id,uri,type,instance
        this._current;
    }
    
    _getId(id, uriHash) {
        return "_view" + "_" + id + "_" + uriHash;
    }

    leave(viewId) {
        if (viewId === undefined) {
            return this;
        }
        let view = this._views[viewId];
        if (!view) {
            return this;
        }
        view.x = window.pageXOffset;
        view.y = window.pageYOffset;
        return this;
    }

    updateViewUri(id, uri) {
        let found = this._views[id],
            uriHash = uri.hashCode(),
            elementId = this._getId(id, uriHash);
        if (!found) {
            return
        }
        let oldId = this._getId(id, found.uriHash);
        found.uriHash = uriHash;
        this._container.find("#" + oldId).attr("id", elementId);
    }

    async reveal({id="", view=null, params={}, uri=""}) {

        if (view == null) {
            throw "undefined view"
        }
        if (params instanceof Promise) {
            params = await params
        }
        if (typeof params !== "object") {
            params = {
                value: params
            }
        }

        await new Promise((resolve, reject) => {
            let found = this._views[id],
                uriHash = uri.hashCode(),
                elementId = this._getId(id, uriHash);

            if (this._current) {
                this._current.hideElement();
            }

            if (found) {
                let element = this._container.find("#" + elementId);
                if (element.length) {

                    if (found.data.type === utils.types.template) {
                        utils.templateRendered(found.data.instance.__params, element, true);
                    } else if (found.data.type === utils.types.class || found.data.type === utils.types.object) {
                        utils.moduleRendered(found.data.instance, {params: found.data.instance.__params, element: element}, true);
                    }

                    utils.showView(found.data, element);
                    this._current = element.showElement();
                    return resolve(element.id);
                }
            }

            return reveal({id, view, params, uri, elementOrId: elementId}).then(result => {
                this._views[id] = result;
                this._current = result.element;
                this._container.appendChild(result.element);
                utils.showView(result.data, result.element);
                return resolve(result.element.id);
            });

        });
    }
});
