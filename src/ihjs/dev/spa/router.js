define([], () => class {

    constructor({
        navigate=(()=>{}),
        leave=(()=>{}),
        error=(()=>{}),
        hash="#",
        test=(route => /^[ A-Za-z0-9_@()/.-]*$/.test(route)),
        routes=(()=>{throw routes})()
    }) {
        this._navigate = navigate;
        this._leave = leave;
        this._error = error;
        this._hash = hash;
        this._hash === "#" || this._hash === "#!" || (() => {throw this._hash})();
        this._test = test;
        if (routes instanceof Array) {
            routes = routes.reduce(function(result, item, index) {
                result[item] = {};
                return result;
              }, {});
        }
        this._routes = {};
        for(let route in routes) {
            let data = routes[route];
            this._test(route) || (() => {throw route})();
            this._routes[route] = {
                id: data.id || route.replace(/\//g, "-").replace("-", "").toCamelCase(),
                name: route,
                view: data.view,
                paramsMap: data.paramsMap || (args => (args.length === 0 ? {} : false)),
                data: data.data
            }
        }
        this._current = undefined; 
        this._manager = {
            reveal: ({id,view,params,uri}) => {return new Promise(resolve=>resolve())},
            leave: (viewId, elementId) => this._manager
        };
    }

    useViewManager(
        manager=(() => {throw manager})()
    ) {
        this._manager = manager;
        return this;
    }

    start() {
        this._onChangeEvent(undefined, true);
        var that = this;
        window.on('hashchange', event => {
            that._onChangeEvent.call(that, event)
        });
        return this;
    }

    getData() {
        return Object.keys(this._routes).map(name => {
            let route = this._routes[name],
                data = route.data || {};
            data.url = document.location.pathname + this._hash + name;
            data.id = route.id;
            data.active = this._current === route
            return data;
        })
    }

    navigate(location) {
        document.location.hash = this._hash + location;
        return this;
    }

    reveal(location) {
        this._onChangeEvent({newHash: this._hash + location});
        return this;
    }

    _onChangeEvent(event={newHash: document.location.hash}, starting=false) {
        if (!event.newHash && event.newURL) {
            event.newHash = event.newURL.replace(document.location.origin + document.location.pathname, "");
        }
        let name,
            uri = event.newHash.replace(this._hash, ""),
            uriPieces = uri.split("/").map(item => decodeURIComponent(item)),
            route,
            candidate,
            params,
            test = "";
            
        let i, len, sliceIndex;
        for (i = 0, len = uriPieces.length; i < len; i++) {
            let piece = uriPieces[i];
            test = test.endsWith("/") ? test + piece : test + "/" + piece;
            candidate = this._routes[test];
            if ((candidate && !route) || (candidate && route.name.length < candidate.name.length)) {
                route = candidate;
                sliceIndex = i + 1;
            }
        }
        if (route) {
            if (uriPieces[uriPieces.length - 1] == "") {
                uriPieces.splice(-1, 1);
            }
            params = route.paramsMap(uriPieces.slice(sliceIndex));
        }

        if (route === undefined || !params) {
            this._error({router: this, uri: uri});
            return;
        } 
 
        let viewId, elementId;
        if (this._current) {
            viewId = this._current.id;
            elementId = this._current.elementId;
        }
        this._manager.leave(viewId, elementId).reveal(
            {id: route.id, view: route.view, params: params, uri: uri}
        ).then(elementId => {
            if (!starting) {
                this._leave({ router: this, route: this._current});
            }
            this._current = route;
            this._current.elementId = elementId;
            this._navigate({router: this, route: route, params: params})
        });
    }

 });
 