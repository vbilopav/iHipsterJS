define([], () => {

    const 
        entries = {};

    return class {
        constructor(obj) {
            if (obj.sub || obj.pub) {
                throw new Error("pubsub already assigned to object!");
            }
            obj.sub = (name, handler) => {
                const doSub = n => {
                    let entry = entries[n];
                    if (!entry) {
                        entry = entries[n] = [];
                    }
                    entries[n].push(handler);
                };
                if (name instanceof Array) {
                    for(let i of name) {
                        doSub(i);
                    }
                } else {
                    doSub(name);
                }

                return obj;
            };
            obj.pub = (name, ...args) => {
                const doPub = n => {
                    const entry = entries[n];
                    if (!entry) {
                        return obj;
                    }
                    setTimeout(() => entry.forEach(f => f.apply(obj, args)), 0);
                };
                if (name instanceof Array) {
                    for(let i of name) {
                        doPub(i);
                    }
                } else {
                    doPub(name);
                }
                return obj;
            };
        }
    }
});