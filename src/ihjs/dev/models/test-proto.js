define([], () => (obj, extensions, throwException=true) => {

    for (let e of extensions) {
        if (obj.prototype[e] !== undefined) {
            if (throwException) {
                throw new Error(`Error: Name collision - object ${obj} already have defined "${e}" !`);
            } else {
                return false;
            }
        }
    }

    return true;

});