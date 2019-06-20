define([], () => class extends HTMLElement {

    constructor() {
        super();

        let dataIndex = this.getAttribute("data-index");
        let html = this.innerHTML;

        this.innerHTML = String.html`
        <div class="ToDoItem" id="item">
            <p class="ToDoItem-Text">${dataIndex + ". " + html}</p>
            <div class="ToDoItem-Delete" onclick="deleteClick">-</div>
        </div>`;
        this.model = new _app.Model().bind(this, this);
    }

    deleteClick() {
        this.context.count--;
        this.model.item.remove();
    }

    setId(value, old) {
        console.log(`id attribute set from ${old} to ${value}`);
    }
    
    setDataIndex(value, old){
        console.log(`dataIndex attribute set from ${old} to ${value}`);
    }
})