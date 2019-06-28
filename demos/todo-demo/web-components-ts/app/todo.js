define(["require", "exports", "demos/todo-demo/web-components-ts/app/count"], function (require, exports, count_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class default_1 {
        constructor(args) {
            window._app.customElements.define({ tag: "todo-item", src: "demos/todo-demo/web-components-ts/app/todo-item" });
            args.options.css = ["/demos/shared/css/todo.css", "/demos/shared/css/todo-item.css"];
            args.options.model = {
                content: "content",
                input: "input"
            };
            this.input = "initial value";
        }
        async render() {
            let index = 0;
            let result = String.html `
            <div class="ToDo">
                <h1 class="ToDo-Header">ihjs To Do demo</h1>
                <div class="ToDo-Container">
                    <div class="ToDo-Content" id="content">`;
            for (let item of await window._app.fetch("/demos/shared/todo.json")) {
                result += String.html `
                <todo-item id="${'todo-item-' + index}" data-index="${index = index + 1}">${item}</todo-item>
            `;
            }
            result += String.html `
                    </div>
                    <input type="text" id="input" />
                    <div id="add" class="ToDo-Add" onclick="createNewToDoItem">+</div>
                </div>
            </div>`;
            count_1.setCount(index + 1);
            return result;
        }
        rendered(args) {
            console.log("I haz following components: ");
            let components = args.element.findAll("todo-item");
            console.log(components);
            console.log("Change some attribute value on todo-item element...");
        }
        createNewToDoItem() {
            this.model.content.append(String.html `<todo-item data-index="${count_1.increase()}">${this.model.input.value}</todo-item>`.toElements());
        }
    }
    exports.default = default_1;
    ;
});
