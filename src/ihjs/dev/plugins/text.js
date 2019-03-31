define([], () => {
    return {
        load(name, req, onload) {
            fetch(req.toUrl(name)).then(response => response.text()).then(response => onload(response));
        }
    };
});
