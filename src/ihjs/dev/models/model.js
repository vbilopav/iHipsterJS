define(["$/extensions/HTMLElement/forEachChild"], () => class {

    constructor({
        model, 
        oncreate=(()=>{})
    }={}) {
        this._model = model;
        this._oncreate = oncreate || (()=>{});
        this._instance = undefined;
        this._names = [];
        this._oncreate = oncreate;
    }

    bind(element, instance) {
        this._instance = instance || Object.assign({}, this);
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
        if (!this._assignProps(element.getAttribute("name") || element.id, element)) {
            return;
        }
    }

    _forEachProgrammatic(element) {
        const model = this._model;
        for(let name in model) {
            if (!model.hasOwnProperty(name)) {
                continue;
            }
            const m = model[name];
            if (typeof m === "string") {
                if (m === element.name || m === element.id) {
                    this._assignProps(name, element);
                }
            } else {
                if (m(element)) {
                    this._assignProps(name, element);
                }
            }
        }
    }

    _assignEvents(element) {
        const attrs = element.attributes;
        for(let i = 0, l = attrs.length; i < l; i++) {
            const
                node = attrs[i],
                attr = node.name;
            if (!attr.startsWith("on")) {
                continue;
            }
            let val = this._instance[node.value.toCamelCase()];
            if (typeof val === "function") {
                this._assignEvent(element, attr, val);
                continue;
            } else {
                if (node.value.startsWith("javascript:")) {
                    continue;
                }
                if (typeof node.value === "string") {
                    this._assignEvent(element, attr, node.value);
                }
            }
        }
    }

    _assignEvent(element, attr, val) {
        element.removeAttribute(attr);
        let inst = this._instance;
        if (typeof val === "function") {
            element.on(attr.replace("on", "").toLowerCase(), () => val.apply(inst, arguments));
        } else {
            element.on(attr.replace("on", "").toLowerCase(), () => {
                return (function() { return eval(val).apply(this, arguments); }).apply(inst, arguments)
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
        Object.defineProperty(this, name, {
            get: () => that._getValue(node, element),
            set: value1 => that._assignValue(node, element, value1)
        });
        this._names.push(name);
        this._oncreate(element);
        const value = this._instance[name];
        if (value === undefined) {
            return true;
        }
        this._assignValue(node, element, value);
        return true;
    }
});
