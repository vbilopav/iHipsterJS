const Builder = require("./builder");
const builder = new Builder("../ihjs/dev/");

builder.buildMin("../ihjs/dist/version/min/");

builder.buildBundle({
    bundleDir: "../ihjs/dist/version/bundle/", 
    entryPoint: "main", 
    pluginsPath: "plugins",
    indexModule: "ihjs",
    sysPath:"sys",
    useMin: true,
    skip: ["$/models/pubsub", "$/models/storage", "cors-template", "cors-text"]
});
