const Builder = require("./builder");
const builder = new Builder("../ihjs/dev/");

builder.buildMin("../ihjs/dist/version/min/");

builder.buildBundle({
    bundleDir: "../ihjs/dist/version/bundle/", 
    entryPoint: "main", 
    pluginsPath: "require-plugins",
    indexModule: "ihjs",
    sysPath:"sys",
    useMin: true,
    skip: ["sys/models/pubsub", "sys/models/storage", "cors-template", "cors-text"]
});
