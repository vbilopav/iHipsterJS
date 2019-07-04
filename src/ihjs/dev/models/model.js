define([
    "ihjs/extensions/apply"
], ({applyExtensionsExcept}) => class {
    
    constructor({
        model, 
        oncreate=(()=>{})
    }={}) {
        this._model = model;
        this._instance = undefined;
        this._names = [];
        this._oncreate = oncreate;
        this.HTMLModelArray = class extends Array {};
        applyExtensionsExcept(this.HTMLModelArray, "HTMLElement", ["find", "findAll"], true);
    }

    bind(element, instance, eventContext) {
        this._instance = instance || Object.assign({}, this);
        this._eventContext = eventContext;
        if (!this._model) {
            element.forEachChild(e => this._forEachDeclarative(e));
        } else {
            element.forEachChild(e => this._forEachProgrammatic(e));
        }
        return this;
    }

    each(callback) {
        for(let name of this._names) {
            callback(this[name], name);
        }
    }

    _forEachDeclarative(element) {
        // name first, id second
        if (!this._assignProps(element.id || element.getAttribute("name"), element)) {
            return;
        }
    }

    _forEachProgrammatic(element) {
        const model = this._model;
        for(let name in model) {
            if (!model.hasOwnProperty(name)) {
                continue;
            }
            const 
                m = model[name];
            if (typeof m === "string") {
                if (m === element.id || m === element.getAttribute("name")) {
                    this._assignProps(name, element);
                }
            } else {
                if (m(element)) {
                    this._assignProps(name, element);
                }
            }
            for (let attr of element.getAttributeNames()) {
                if (attr.startsWith("on")) {
                    this._assignEvents(element);
                    //break;
                }
            }
        }
    }

    _assignEvents(element) {
        let attrs = [];
        
        for(let i = 0, l = element.attributes.length; i < l; i++) {
            let node = element.attributes[i];
            if (!node.name.startsWith("on")) {
                continue;
            };
            attrs.push(node);
        }
        let l = attrs.length;
        if (!l) {
            return;
        }
        for(let i = 0; i < l; i++) {
            let
                node = attrs[i],
                attr = node.name;
            if (!attr.startsWith("on")) {
                continue;
            }
            let nodeVal = node.value;
            if (nodeVal === "") {
                nodeVal = element.dataAttr(attr);
            }
            let val = this._instance[nodeVal.toCamelCase()];
            if (typeof val === "function") {
                if (node.value !== "") {
                    element.attr(attr, "");
                    element.dataAttr(attr, nodeVal);
                }
                this._assignEvent(element, attr, val);
                continue;
            } else {
                if (nodeVal.startsWith("javascript:") || nodeVal.indexOf("=>") === -1) {
                    continue;
                }
                this._assignEvent(element, attr, nodeVal);
            }
        }
    }

    _addEventListener(element, eventName, eventHandler) {
        if (element.__modelEvents) {
            let oldHandler = element.__modelEvents[eventName];
            if (oldHandler) {
                element.off(eventName, oldHandler);
                delete element.__modelEvents[eventName];
            }
        } else {
            element.__modelEvents = {};
        }
        element.on(eventName, eventHandler);
        element.__modelEvents[eventName] = eventHandler;
    }

    _assignEvent(element, attr, val) {
        let eventName = attr.replace("on", "").toLowerCase();
        let inst = this._eventContext || this._instance;
        if (typeof val === "function") {
            this._addEventListener(element, eventName, (...args) => val.apply(inst, args));
        } else {
            this._addEventListener(element, eventName, (...args) => {
                return (function() { 
                    return eval(val).apply(this, args); 
                }).apply(inst);
            });
        }
    }

    _assignValue(node, element, value) {
        if (node === "SELECT" || node === "INPUT") {
            if (node === "INPUT" && element.type === "checkbox") {
                element.checked = value;
            } else {
                element.value = value;
            }
        } else {
            element.html(value);
            if (node === "A") {
                element.href = value;
            }
        }
    }

    _getValue(node, element) {
        if (node === "SELECT") {
            return element.options[element.selectedIndex];
        }
        return element;
    }

    _assignProps(name, element) {
        this._assignEvents(element);
        
        if (!name) {
            return false;
        }
        if (name.indexOf("-") !== -1) {
            name = name.toCamelCase();
        }
        
        const node = element.nodeName;
        const that = this;
        if (!this._names.includes(name)) {
            Object.defineProperty(this, name, {
                get: () => that._getValue(node, element),
                set: value1 => that._assignValue(node, element, value1),
                configurable: true
            });
            this._names.push(name);
        } else {
            let current = this[name];
            if (Array.isArray(current)) {
                current.push(element)
            } else {
                current = new this.HTMLModelArray(current, element);
            }
            Object.defineProperty(this, name, {
                get: () => current,
                configurable: true
            });
        }
        this._oncreate(element);
        const value = this._instance[name];
        if (value === undefined) {
            return true;
        }
        this._assignValue(node, element, value);
        return true;
    }
});
