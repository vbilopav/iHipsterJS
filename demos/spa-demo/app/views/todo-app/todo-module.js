define(["views/todo-app/todo-item-module"], Item => class {

    constructor() {
        this.list = ["clean the house", "buy milk"];
        this.item = new Item();
        this.value = "";
        this.model = new _app.Model();
    }

    render() {
        return [() => String.html`
            ${this.template.css.import("../shared/css/todo.css", "../shared/css/todo-item.css")}
            <div class="ToDo">
                <h1 class="ToDo-Header">VB SPA template To Do</h1>
                <div class="ToDo-Container">
                    <div class="ToDo-Content" id="content">
                        ${this.template.forEach(this.list, item => this.item.render({params: item}))}
                    </div>
                    <input type="text" id="input" value="${this.value}" />
                    <div class="ToDo-Add" onclick="createNewToDoItem">+</div>
                </div>
            </div>`, 
            this
        ];
    }

    rendered({element}) {
        this.model.bind(element, this);
    }

    createNewToDoItem() {
        this.model.content.append(
            this.item.render({params: this.model.input.value}).toHTML()
        )
    }

});