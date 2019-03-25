//
// String.html template string tag helper doesn't do anything but
// helps lit-html Visual Studio Code extension to have 
// syntax highlighting and language support for html inside of JavaScript 
//
define([], () => String.html`
<div>
    <h3>This is module view that returns plain-text</h3>
    <p>
        Modules can return plain text.
        <br /><br />
        View location: <pre>/app/views/modules/simple-text</pre>
        <br />
        Full route definition:
        <pre>"/module-plain-text": {
    view: "views/modules/module-plain-text",
    data: {
        title: "Plain text from module",
        category: "modules"
    }
}</pre>
        <br />
        You can have syntax highlighting and language support for html inside of JavaScript, 
        see comment inside module...
        <br /><br />
        <hr />
    </p>
</div>
`);
