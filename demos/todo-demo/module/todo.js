define(["demos/todo-demo/module/todo-item"], Item => class {

    constructor({options}) {
        options.css = ["/demos/shared/css/todo.css", "/demos/shared/css/todo-item.css"];
        this.value = "initial";
        this.count = 0;
    }

    async render() {
        let html = String.html`
            <div class="ToDo">
                <h1 class="ToDo-Header">ihjs To Do demo</h1>
                <div class="ToDo-Container">
                    <div class="ToDo-Content" id="content">
        `;

        for (let [index, item] of Object.entries(await _app.fetch("/demos/shared/todo.json"))) {
            html += String.html`<span data-index=${this.count = ++index} data-item="${item}"></span>`;
        }

        html += String.html`
                    </div>
                <input type="text" id="input" value="${this.value}" />
                <div class="ToDo-Add" onclick="createNewToDoItem">+</div>
            </div>
        </div>
        `;

        return html;
    }

    rendered() {
        this.model.content.findAll("span").forEach(span => _app.render(new Item(this), span));
    }

    createNewToDoItem() {
        let element = String.html`<span data-index=${++this.count} data-item="${this.model.input.value}"></span>`.dom();
        _app.render(new Item(this), element);
        this.model.content.append(element);
    }

});