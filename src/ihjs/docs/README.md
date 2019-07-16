[![npm version](https://badge.fury.io/js/ihjs.svg)](https://badge.fury.io/js/ihjs)


# Quick start

## Include script tag in you HTML document:

```html
<!DOCTYPE html>
<head></head>
<html>
<body>
    <script src="ihjs.js"></script>
</body>
</html>
```

## To define default template include template tag above script tag:

```html
<!DOCTYPE html>
<head></head>
<html>
<body>
    <template>
        <h1>My template</h1>
        <p>My template content</p>
        ${
            this.template.rendered = () => {
                console.log("My template has been rendered!");
            }
        }
    </template>
    <script src="ihjs.js"></script>
</body>
</html>
```

## To enable JavaScript language support in you editor of choice - surround template expression with script tags:

```html
<!DOCTYPE html>
<head></head>
<html>
<body>
    <template>
        <h1>My template</h1>
        <p>My template content</p>
        ${<script>
            this.template.rendered = () => {
                console.log("My template has been rendered!");
            }
        </script>}
    </template>
    <script src="ihjs.js"></script>
</body>
</html>
```

`this.template.rendered` is template event. 

To learn more about template helpers and events see [working with templates section](https://github.com/vbilopav/iHipsterJS/blob/master/src/ihjs/docs/working-with-templates.md)

## To reference HTML element from template in your expression add id attribute to element you whish to use (name works as well):

```html
<!DOCTYPE html>
<head></head>
<html>
<body>
    <template>
        <h1>My template</h1>
        <p id="content">My template content</p>
        ${<script>
            this.template.rendered = () => {
                this.model.content.html("New content");
            }
        </script>}
    </template>
    <script src="ihjs.js"></script>
</body>
</html>
```

`this.model.content` is instance type of `HTMLElement`.

`html()` is `HTMLElement` extension. 

To learn more about available extensions see [extensions section](https://github.com/vbilopav/iHipsterJS/blob/master/src/ihjs/docs/extensions.md)

## To define default template from external file:

```html
<!DOCTYPE html>
<head></head>
<html>
<body>
    <script data-view-module="template!my-template.html" src="ihjs.js"></script>
</body>
</html>
```
my-template.html
```html 
<h1>My template</h1>
<p id="content">My template content</p>
${<script>
this.template.rendered = () => {
    this.model.content.html("New content");
}
</script>}
```

## To define default JavaScript module view from external file:

```html
<!DOCTYPE html>
<head></head>
<html>
<body>
    <script data-view-module="my-view" src="ihjs.js"></script>
</body>
</html>
```
my-view.js (raw, no transpile)
```javascript
define([], () => class {
    render() {
        return `
        <h1>My template</h1>
        <p id="content">My template content</p>`;
    }
    rendered() {
        this.model.content.html("New content");
    }
});
```
my-view.js (babel or typescript transpiler)
```javascript
export default class {
    render() {
        return `
        <h1>My template</h1>
        <p id="content">My template content</p>`;
    }
    rendered() {
        this.model.content.html("New content");
    }
});
```

## To enable JavaScript language support in JavaScript module view:

For Visual Studio Code install [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) extension.

Your view:
my-view.js (babel or typescript transpiler)
```javascript
export default class {
    render() {
        return String.html`
        <h1>My template</h1>
        <p id="content">My template content</p>`;
    }
    rendered() {
        this.model.content.html("New content");
    }
});
```

For JetBrains line of editors do nothing.

## To define your model default values

Template:
```html
<h1>My template</h1>
<p id="content">My template content</p>`
${<script>
this.context = {
    content = "New Value"
}
</script>}
```

Module view:
```javascript
export default class {
    constructor() {
        this.context = {
            content = "New Value"
        }
    }
    render() {
        return String.html`
        <h1>My template</h1>
        <p id="content">My template content</p>`
    }
});
```

## To work with events

Template:
```html
<h1>My template</h1>
<button onclick="clicked">Click me</button>
${<script>
this.clicked = e => {
    console.log("clicked", e);
}
</script>}
```

Module view:
```javascript
export default class {
    render() {
        return String.html`
        <h1>My template</h1>
        <button onclick="clicked">Click me</button>`;
    }
    clicked(e) {
        console.log("clicked", e);
    }
});
```

## To work with lambda functions in inline event handler

Template:
```html
<h1>My template</h1>
<button onclick="e => this.clickHandler(e)">Click me</button>
${<script>
this.clickHandler = e => {
    console.log("clicked", e);
}
</script>}
```

Module view:
```javascript
export default class {
    render() {
        return String.html`
        <h1>My template</h1>
        <button onclick="e => this.clickHandler(e)">Click me</button>`;
    }
    clickHandler(e) {
        console.log("clicked", e);
    }
});
```



To learn more about working with models see [working with models section](https://github.com/vbilopav/iHipsterJS/blob/master/src/ihjs/docs/working-with-models.md)



Check out [script tag attributes](https://github.com/vbilopav/iHipsterJS/blob/master/src/ihjs/docs/scrtip-tag-attributes.md)

# Loader plug-ins

# Extensions
