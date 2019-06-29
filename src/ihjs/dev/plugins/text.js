define([], () => {
    return {
        load(name, req, onload) {
            let config = require.getConfig();
            if (config._modules) {
                let result = config._modules["text!" + name];
                if (result !== undefined) {
                    onload(result);
                    return;
                }
            }
            fetch(req.toUrl(name))
            .then(response => {
                if (response.status !== 200) {
                    console.error(`Couldn't load text module ${name} at location ${response.url}\nFailed with status ${response.status + " (" + response.statusText})`);
                }
                return response.text()
            })
            .then(response => onload(response));
        }
    };
});
