///<reference path="../../../../src/ihjs/build/1.1.2/types/core.d.ts"/>

import {setCount, increase} from "demos/todo-demo/web-components-ts/app/count";

export default class {
    input: string
    model: {
        content: HTMLElement
        input: HTMLInputElement
    }

    constructor(args: ViewConstructorArgs) {
        window._app.customElements.define({
            tag: "todo-item", 
            src: "demos/todo-demo/web-components-ts/app/todo-item",
            observedAttributes: ['id', 'data-index']
        });
        args.options.css = ["/demos/shared/css/todo.css", "/demos/shared/css/todo-item.css"];
        
        /*
        * Use declarative approach to model -> Instead of instantiating all elements that have id or name, create just this one with this id or name.
        * Reason is because web component is created first and contains multiple <div class="ToDoItem" id="item"> that would cause to initiate in this model multiple times
        */
        args.options.model = {
            content: "content", 
            input: "input"
        };
        this.input = "initial value";
    }

    async render() {
        let index = 0;
        let result = String.html`
            <div class="ToDo">
                <h1 class="ToDo-Header">ihjs To Do demo</h1>
                <div class="ToDo-Container">
                    <div class="ToDo-Content" id="content">`;
        
        for(let item of await window._app.fetch("/demos/shared/todo.json")) {
            result += String.html`
                <todo-item id="${'todo-item-' + index}" data-index="${index = index+1}">${item}</todo-item>
            `;
        }
        result += String.html`
                    </div>
                    <input type="text" id="input" />
                    <div id="add" class="ToDo-Add" onclick="createNewToDoItem">+</div>
                </div>
            </div>`;
        setCount(index + 1);
        return result;
    }

    rendered(args: ViewMethodArgs) {
        console.log("I haz following components: ");
        let components = args.element.findAll("todo-item");
        console.log(components);
        console.log("Change some attribute value on todo-item element...");
    }

    createNewToDoItem() {
        this.model.content.append(String.html`<todo-item data-index="${increase()}">${this.model.input.value}</todo-item>`.toElements())
    }
};
