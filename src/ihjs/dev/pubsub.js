define([], () => {

    const 
        _entries = {};

    return {
        subscribe(name, handler) {
            const 
                doSub = n => {
                    let 
                        entry = _entries[n];
                    if (!entry) {
                        entry = _entries[n] = [];
                    } 
                    return _entries[n].push(handler) - 1;
                };
            if (name instanceof Array) {
                let result = [];
                for(let i of name) {
                    result.push({"name": i, index: doSub(i)});
                }
                return result;
            } else {
                return doSub(name);
            }
        },
        publish(name, ...args) {
            const 
                doPub = n => {
                    const 
                        entry = _entries[n];
                    if (!entry) {
                        return;
                    }
                    entry.forEach(f => f.apply(this, args));
                };
            if (name instanceof Array) {
                for(let i of name) {
                    doPub(i);
                }
            } else {
                doPub(name);
            }
        },
        unsubscribe(name, ref) {
            let 
                result = false;
            if (ref instanceof Array === false) {
                ref = [{"name": name, index: ref}];
            }
            for(let item of ref) {
                let entry = _entries[item.name]
                if (!entry) {
                    continue;
                }
                entry.splice(item.index, 1);
                if (!result) {
                    result = true;
                }
            }
            return result;
        }
    }
});