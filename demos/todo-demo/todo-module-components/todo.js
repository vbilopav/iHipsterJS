define([], () => {

    _app.customElements.define({tag: "todo-item", src: "demos/todo-module-components/todo-item"});

    return class {

        constructor({options}) {
            options.css = "demos/shared/css/todo.css";
            this.value = "initial";
            this.count = 0;
        }

        async render() {
            let index = 0;
            let result = String.html`
                <div class="ToDo">
                    <h1 class="ToDo-Header">ihjs To Do demo</h1>
                    <div class="ToDo-Container">
                        <div class="ToDo-Content" id="content">`;
            
            for(let item of await _app.fetch("../shared/todo.json")) {
                result += String.html`
                    <todo-item id="${'todo-item-' + index}" data-index="${index = index+1}">${item}</todo-item>
                `;
            }
            result += String.html`
                        </div>
                        <input type="text" id="input" value="${this.value}" />
                        <div class="ToDo-Add" onclick="createNewToDoItem">+</div>
                    </div>
                </div>`;
            this.count = index;
            return result;
        }

        rendered() {
            // Only rendered components that have name or id attribute will ba available in children property
            console.log("I haz following components: ");
            console.log(this.children);
            console.log();
        }

        createNewToDoItem() {
            this.model.content.insertAdjacentHTML(
                "beforeend",
                `<todo-item data-index="${++this.count}">${this.model.input.value}</todo-item>`
            )
        }
    }

});