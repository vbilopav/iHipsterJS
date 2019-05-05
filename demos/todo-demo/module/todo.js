define(["demos/todo-demo/module/todo-item"], Item => class {

    constructor() {
        this.item = new Item();
        this.value = "initial";
        this.model = new _app.Model();
    }

    render() {
        return [() => String.html`
            ${this.template.css("/demos/todo-demo/css/todo.css", "/demos/todo-demo/css/todo-item.css")}
            <div class="ToDo">
                <h1 class="ToDo-Header">ihjs To Do demo</h1>
                <div class="ToDo-Container">
                    <div class="ToDo-Content" id="content">
                        ${async () => this.template.forEach(
                            await _app.fetch("/demos/todo-demo/data/todo.json"), 
                            item => this.item.render({params: item})
                        )}
                    </div>
                    <input type="text" id="input" value="${this.value}" />
                    <div class="ToDo-Add" onclick="createNewToDoItem">+</div>
                </div>
            </div>`, 
            this // pass this reference to template
        ];
    }

    createNewToDoItem() {
        this.model.content.append(
            this.item.render({params: this.model.input.value}).toHTML()
        )
    }

});