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
            };
            let url = req.toUrl(name);
            // loader bug with templates names
            let dots = url.indexOf("../../..");
            if (dots > 0 && url.indexOf("/plugins") > -1) {
                let p = url.split("/");
                url = url.substring(0, dots) + p[p.length-1];
            }
            fetch(url)
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
