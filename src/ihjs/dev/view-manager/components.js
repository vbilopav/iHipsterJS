define(["$/app", "$/view-manager/utils"], (app, {isTemplate}) => {

    if (!window.customElements) {
        throw new Error("customElements are not supported! Please update your browser...");
    }

    const resolveElement = (item, result) => {
        let component = class extends (result.default || result) {
            constructor() { 
                super(item); 
                if (!this.model || (this.model && !(this.model instanceof app.Model))) {
                    this.model = new app.Model({model: this.model}).bind(this, this);
                } 
            }
        }
        if (item.observedAttributes && item.observedAttributes.length) {
            Object.defineProperty(component, "observedAttributes", { get: () => item.observedAttributes });
            component.prototype._connectedCallback = component.prototype.connectedCallback;
            component.prototype.connectedCallback = function(...args) {
                component.prototype._connectedCallback && component.prototype._connectedCallback.call(this, ...args);
                this._rendered = true;
            }
            component.prototype._attributeChangedCallback = component.prototype.attributeChangedCallback;
            component.prototype.attributeChangedCallback = function(attrName, oldVal, newVal) {
                component.prototype._attributeChangedCallback && component.prototype._attributeChangedCallback.call(this, attrName, oldVal, newVal);
                if (!this._rendered) {
                    return;
                }
                let name = ("set-" + attrName).toCamelCase();
                component.prototype[name] && typeof component.prototype[name] === "function" && component.prototype[name](newVal, oldVal);
            }
        }
        window.customElements.define(item.tag, component, item.options);
    };

    const resolveTemplate = (item, result) => new Promise(resolve => {
        let component = class extends HTMLElement {
            constructor() {
                super();
                this._rendered = false;
                for (let attr of this.getAttributeNames()) {
                    this[attr.toCamelCase()] = this.attributes[attr].value;
                }
                this.template = Object.assign(this.template || {}, item);
                app.render(result, this, this).then(() => {
                    this._rendered = true
                    resolve();
                });
            }
            attributeChangedCallback(attrName, oldVal, newVal) {
                if (component.prototype.attributeChangedCallback !== this.attributeChangedCallback) {
                    this.attributeChangedCallback(...arguments);
                }
                if (!this._rendered) {
                    return;
                }
                let name = ("set-" + attrName).toCamelCase();
                this.template && this.template[name] && typeof this.template[name] === "function" && this.template[name](newVal, oldVal);
            }
            connectedCallback() {
                if (component.prototype.connectedCallback !== this.connectedCallback) {
                    this.connectedCallback(...arguments);
                }
            }
            disconnectedCallback() {
                if (component.prototype.disconnectedCallback !== this.disconnectedCallback) {
                    this.disconnectedCallback(...arguments);
                }
            }
            adoptedCallback() {
                if (component.prototype.adoptedCallback !== this.adoptedCallback) {
                    this.disconnectedCallback(...arguments);
                }
            }
        }
        if (item.observedAttributes && item.observedAttributes.length) {
            Object.defineProperty(component, "observedAttributes", { get: () => item.observedAttributes });
        }
        window.customElements.define(item.tag, component, item.options);
    });

    app.customElements = {
        define: (...args) => new Promise((resolve, reject) => {
            let items = {};
            for(let arg of args) {
                items[arg.src] = arg;
            }
            require(Object.keys(items), (...results) => {
                const resolved = [], promises = [];
                for(let i = 0, l = results.length; i < l; i++) {
                    let item = args[i], result = results[i];

                    if (result.prototype instanceof HTMLElement || (result.default && result.default.prototype instanceof HTMLElement)) {
                        resolveElement(item, result);
                        resolved.push(item);
                    } else if (typeof result === "function" && isTemplate(undefined, result)) {
                        promises.push(resolveTemplate(item, result));
                        resolved.push(item);
                    }

                }
                if (resolved.length) {
                    if (promises.length) {
                        return Promise.all(promises).then(() => resolve(resolved));
                    }
                    return resolve(resolved);
                }
                return reject("Couldn't find components to register.");
            });
        })
    };

});
