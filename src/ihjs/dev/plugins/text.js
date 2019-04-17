define([], () => {
    return {
        load(name, req, onload) {
            let config = require.getConfig();
            if (config._modules) {
                let result = config._modules["$text!" + name];
                if (result !== undefined) {
                    onload(result);
                    return;
                }
            }
            fetch(req.toUrl(name)).then(response => response.text()).then(response => onload(response));
        }
    };
});
