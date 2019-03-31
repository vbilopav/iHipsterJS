define([], () => {
    
    return {
        load(name, req, onload) {
            fetch(req.toUrl(name), {mode: "cors"}).then(response => response.text()).then(response => onload(response));
        }
    };

});
