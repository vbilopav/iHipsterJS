define([], () => class {

    constructor(parent) {
        this.parent = parent;
    }

    render({params}) {
        return String.html`
            <div class="ToDoItem" id="item">
                <p class="ToDoItem-Text">${params.index + ". " + params.item}</p>
                <div class="ToDoItem-Delete" onclick="deleteClick">-</div>
            </div>`
    }

    deleteClick() {
        this.model.item.remove();
        this.parent.count--;
    }

})