define(["ihjs/app"], _app => {

    const 
        _cssImported = [];

    return {
        getImported: () => _cssImported,
        addLink: (link, onload, onerror) => new Promise((resolve, reject) => {
            let e = document.createElement("link");
            e.async = true;
            e.href = link;
            e.rel = "stylesheet";
            e.onload = () => {
                onload && onload();
                resolve(link);
            };
            e.onerror = () => {
                (onerror && onerror()) || (onload && onload());
                reject(link);
            };
            document.head.appendChild(e);
        }),
        addContent: content => {
            if (content instanceof Array) {
                content = content.join("\n");
            }
            document.head.appendChild(
                `<style type="text/css">
                    ${content}
                </style>`.dom()
            )
        },
        shouldLoad() {
            return !(_app.dev === false && _app.config.loadCssAlways === false)
        }
    }
});
