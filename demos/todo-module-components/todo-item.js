define([], () => class {

    constructor({options}) {
        options.css = "demos/shared/css/todo-item.css";
    }

    render({params}) {
        let {dataIndex, html}=params;
        return String.html`
            <div class="ToDoItem" id="item">
                <p class="ToDoItem-Text">${dataIndex + ". " + html}</p>
                <div class="ToDoItem-Delete" onclick="deleteClick">-</div>
            </div>`
    }

    deleteClick() {
        this.parent.count--;
        this.model.item.remove();
    }

    set id(value) {
        console.log("id attribute set to " + value);
    } 

    set dataIndex(value) {
        console.log("data-index attribute set to " + value);
    } 
})