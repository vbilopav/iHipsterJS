define([], () => class extends HTMLElement {

    constructor({context}) {
        super();
        this.context = context;
        let dataIndex = this.getAttribute("data-index");
        let html = this.innerHTML;

        this.innerHTML = String.html`
        <div class="ToDoItem" id="item">
            <p class="ToDoItem-Text">${dataIndex + ". " + html}</p>
            <div class="ToDoItem-Delete" onclick="deleteClick">-</div>
        </div>`;
    }

    deleteClick() {
        this.context.count--;
        this.model.item.parentElement.remove();
    }

    setId(value, old) {
        console.log(`id attribute set from ${old} to ${value}`);
    }
    
    setDataIndex(value, old){
        console.log(`dataIndex attribute set from ${old} to ${value}`);
    }

    connectedCallback() {
        console.log("connected", this)
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log("attributeChangedCallback: " + attrName + " attribute set to " + newVal);
    }
})