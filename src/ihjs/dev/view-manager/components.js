define(["$/app"], app => {

    app.customElements = {
        define: (...args) => new Promise((resolve, reject) => {
            let items = {};
            for(let arg of args) {
                items[arg.src] = arg;
            }
            // ***
            // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
            // ***
            require(Object.keys(items), (...results) => {
                const resolved = [];
                for(let i = 0, l = results.length; i < l; i++) {
                    let item = args[i], res = results[i];

                    if (res.prototype instanceof HTMLElement || (res.default && res.default.prototype instanceof HTMLElement)) {
                        if (!window.customElements) {
                            reject("customElements not supported")
                        }
                        let inst = res.default || res;
                        if (item.context) {
                            inst.prototype.context = item.context;
                        }
                        if (item.observedAttributes && item.observedAttributes.length) {
                            Object.defineProperty(inst, "observedAttributes", {
                                get: () => {
                                    inst.prototype._rendered = true;
                                    return item.observedAttributes
                                }
                            });
                            inst.prototype.attributeChangedCallback = (attrName, oldVal, newVal) => {
                                if (!inst.prototype._rendered) {
                                    return;
                                }
                                let name = ("set-" + attrName).toCamelCase();
                                inst.prototype[name] && typeof inst.prototype[name] === "function" && inst.prototype[name](newVal, oldVal);
                            }
                        }
                        window.customElements.define(item.tag, inst, item.options);
                        resolved.push(item);

                    } else if (typeof res === "function" && res.toString().indexOf("parseTemplate") !== -1) {

                        let component = class extends HTMLElement {
                            constructor() {
                                super();
                                this.rendered = false;
                                for (let attr of this.getAttributeNames()) {
                                    this[attr.toCamelCase()] = this.attributes[attr].value;
                                }
                                res(this).then(content => {
                                    this.innerHTML = content;
                                    this.template.model = new _app.Model({model: this.template.model}).bind(this,  this.template.modelContext || this.template, this);
                                    this.rendered = true;
                                });
                                if (item.context) {
                                    this.template.context = item.context;
                                }
                            }
                            attributeChangedCallback(attrName, oldVal, newVal) {
                                if (!this.rendered) {
                                    return;
                                }
                                let name = ("set-" + attrName).toCamelCase();
                                this.template && this.template[name] && typeof this.template[name] === "function" && this.template[name](newVal, oldVal);
                            }
                        }
                        if (item.observedAttributes && item.observedAttributes.length) {
                            Object.defineProperty(component, "observedAttributes", {
                                get: () => item.observedAttributes
                            });
                        }
                        window.customElements.define(item.tag, component, item.options)
                        resolved.push(item);
                    }


                    
                }
                if (resolved.length) {
                    return resolve(resolved);
                }
                return reject(resolved);
            });
        })
    }
});
