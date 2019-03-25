define([], () => {

    class ProtectedLocalStorage {
        constructor() {
            this._dict = {};
            this._storage = localStorage;
        }
        getItem(ns) {
            let value = this._dict[ns];
            if (value === undefined) {
                value = this._storage.getItem(ns);
                if (value === null) {
                    return null;
                }
                this._dict[ns] = value;
            }
            return value;
        }
        setItem(ns, value) {
            this._storage.setItem(ns, value);
            this._dict[ns] = value;
        }
        removeItem(ns) {
            this._storage.removeItem(ns);
            delete this._dict[ns];
        }
    }

    const 
        names = [];
    var
        defaultNs;

    class Storage {
        constructor({
            storage=new ProtectedLocalStorage(),
            namespace="", 
            model=(() => {throw "model is required!"})(), 
            conversion={}
        }) {
            this._storage = storage;
            if (!defaultNs) {
                throw new Exception("default namespace cannot be empty or null");
            }
            this._ns = namespace;
            this._model = model;
            this._conversion = conversion;
            if (this._ns) {
                this._ns = this._ns + ".";
            }
            for(let [name, defualtValue] of Object.entries(model)) {
                this.create(name, defualtValue);
            }
        }

        static setNamespace(ns) {
            if (!ns) {
                ns = "";
            } else {
                ns = ns + ".";
            }
            defaultNs = ns;
            return Storage;
        }

        create(name, defualtValue) {
            let namespace = this._getNamespace(name);
            if (names.indexOf(namespace) !== -1) {
                throw new Exception(`Name "${namespace}" is already been defined!`);
            }
            names.push(namespace);
            Object.defineProperty(this, name, {
                get: () => {
                    const value = this._storage.getItem(namespace);
                    if (value === null && defualtValue !== undefined) {
                        return defualtValue;
                    }
                    const conversion = this._conversion[name];
                    if (conversion) {
                        return conversion(value);
                    }
                    return value;
                },
                set: value => {
                    if (value === null) {
                        this._storage.removeItem(namespace);
                    } else {
                        this._storage.setItem(namespace, value);
                    }
                }
            });
            return this;
        }

        _getNamespace(name) {
            if (this._ns) {
                return defaultNs + this._ns + name;
            } else {
                return defaultNs + name;
            }
        }
    }

    return Storage;
});