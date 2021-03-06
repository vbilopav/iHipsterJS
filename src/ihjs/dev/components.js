define([
    "ihjs/app", 
    "ihjs/view-manager/utils", 
    "ihjs/template/load-text",
    "ihjs/template/parser"
], (
    app, 
    {types, getViewType}, 
    {getTemplate},
    {parseTemplate},
) => {

    if (!window.customElements) {
        throw new Error("customElements are not supported! Please update your browser...");
    }

    const Model = ihjs.Model;

    const resolveElement = (item, result) => {
        let component = class extends (result.default || result) {
            constructor() { 
                super(item); 
                if (!this.model || (this.model && !(this.model instanceof Model))) {
                    this.model = new Model({model: this.model}).bind(this, this);
                } 
            }
        }
        if ((item.observedAttributes && item.observedAttributes.length) || (component.observedAttributes && component.observedAttributes.length)) {
            if (!component.observedAttributes) {
                Object.defineProperty(component, "observedAttributes", { get: () => item.observedAttributes });
            }
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

    const resolveModule = (item, result, type) => new Promise((resolve, reject) => {
        let component = class extends HTMLElement {
            constructor() {
                super();
                this._rendered = false;
                if (type === types.template) {
                    for (let attr of this.getAttributeNames()) {
                        this[attr.toCamelCase()] = this.attributes[attr].value;
                    }
                    this.template = Object.assign(this || {}, item);
                    this.__noDataset = true;
                    app.render(result, this, this).then(() => {
                        this._rendered = true
                        resolve();
                    }).catch(e => reject(e));
                } else if (type === types.class) {
                    let params = {innerHTML: this.innerHTML, innerText: this.innerText};
                    for (let attr of this.getAttributeNames()) {
                        params[attr.toCamelCase()] = this.attributes[attr].value;
                    }
                    let view = new result(item);
                    view.element = this;
                    this._instance = view;
                    params.__noDataset = true;
                    app.render(view, this, params).then(() => {
                        this._rendered = true;
                        resolve();
                    }).catch(e => reject(e));
                }
            }
            attributeChangedCallback(attrName, oldVal, newVal) {
                let inst = (this._instance || this);
                if (inst.attributeChangedCallback && component.prototype.attributeChangedCallback !== inst.attributeChangedCallback) {
                    inst.attributeChangedCallback(...arguments);
                }
                if (!this._rendered) {
                    return;
                }
                let name = ("set-" + attrName).toCamelCase();
                inst[name] && typeof inst[name] === "function" && inst[name](newVal, oldVal);
            }
            connectedCallback() {
                let inst = (this._instance || this);
                if (inst.connectedCallback && component.prototype.connectedCallback !== inst.connectedCallback) {
                    inst.connectedCallback(...arguments);
                }
            }
            disconnectedCallback() {
                let inst = (this._instance || this);
                if (inst.disconnectedCallback && component.prototype.disconnectedCallback !== inst.disconnectedCallback) {
                    inst.disconnectedCallback(...arguments);
                }
            }
            adoptedCallback() {
                let inst = (this._instance || this);
                if (inst.adoptedCallback && component.prototype.adoptedCallback !== inst.adoptedCallback) {
                    inst.disconnectedCallback(...arguments);
                }
            }
        }
        let getter = result.observedAttributes || item.observedAttributes;
        if (getter && getter.length) {
            Object.defineProperty(component, "observedAttributes", { get: () => getter });
        }
        try {
            window.customElements.define(item.tag, component, item.options);
        } catch(e) {
            reject(e);
        }
        
    });

    const customElementsDefine = (...args) => new Promise((resolve, reject) => {
        let items = {};
        for(let arg of args) {
            items[arg.src] = arg;
        }
        require(Object.keys(items), (...results) => {
            const resolved = [], promises = [];
            for(let i = 0, l = results.length; i < l; i++) {
                let item = args[i], result = results[i];
                if (result.default) {
                    result = result.default;
                }
                if (result.prototype instanceof HTMLElement) {
                    try {
                        resolveElement(item, result);
                    } catch(e) {
                        return reject(e);
                    }
                    resolved.push(item);
                    continue;
                }

                let type = getViewType(result, item.src);
                if (type === types.template || type === types.class) {
                    promises.push(resolveModule(item, result, type));
                    resolved.push(item);
                }
            }

            if (resolved.length) {
                if (promises.length) {
                    return Promise.all(promises).then(() => resolve(resolved)).catch((e => reject(e)));
                }
                return resolve(resolved);
            }
            return reject("Couldn't find components to register.");
        });
    });
    

    const promises = [];

    return {
        addElement: template => {
            const 
                t = getTemplate(undefined, template),
                observedAttributes = t.data.observedAttributes ? JSON.parse(t.data.observedAttributes.replace(new RegExp("'", 'g'), '"')) : null;
            if (t.data.tag && !t.data.src) {
                let view = (data, locale) => parseTemplate(t.html, data, locale);
                view._isTemplate = true;
                promises.push(resolveModule(
                    {tag: t.data.tag, observedAttributes: observedAttributes}, 
                    view, 
                    types.template
                ));
            } else if (template.dataset.tag && template.dataset.src) {
                promises.push(customElementsDefine({tag: t.data.tag, src: t.data.src, observedAttributes: observedAttributes}));
            }
        },
        resolveElements: () => new Promise(resolve => {
            if (promises.length) {
                return Promise.all(promises).then(resolve()).catch(e => {throw e});
            }
            return resolve();
        }),
        customElementsDefine
    }
});
