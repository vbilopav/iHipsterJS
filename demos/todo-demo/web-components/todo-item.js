define(["demos/todo-demo/web-components/count"], ({decrease}) => class extends HTMLElement {

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
        decrease();
        this.model.item.remove();
    }

    // The browser calls the attributeChangedCallback() for any attributes whitelisted in the observedAttributes array 
    static get observedAttributes() {
        return ['id', 'data-index'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(attrName + " attribute set to " + newVal);
    }
})