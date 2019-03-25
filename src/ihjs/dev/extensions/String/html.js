define(["sys/models/test-proto"], test => {

    test(String, ["html"]);
    //
    // lit-html vs code extension support
    //
    String.html = (pieces, ...args) => String.raw(pieces, ...args);
});