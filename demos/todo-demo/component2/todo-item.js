define([], () => class {

    constructor({context}) {
        this.context = context;
    }

    render({params}) {
        return String.html`
            <div class="ToDoItem" id="item">
                <p class="ToDoItem-Text">${params.dataIndex + ". " + params.innerText}</p>
                <div class="ToDoItem-Delete" onclick="deleteClick">-</div>
            </div>`
    }

    deleteClick() {
        this.model.item.parentElement.remove();
        this.context.count--;
    }

    rendered() {
        console.log("rendered", this.element);
    }

    setId(value, old) {
        console.log(`id attribute set from ${old} to ${value}`);
    }
    
    setDataIndex(value, old){
        console.log(`dataIndex attribute set from ${old} to ${value}`);
    }

    connectedCallback() {
        console.log("connected", this.element);
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log("attributeChangedCallback: " + attrName + " attribute set to " + newVal, this);
    }

    /* 
    * observedAttributes list is defined in call  _app.customElements.define (see todo.js)
    * is can also be defined here (as proscribed by current standard)
    */
    // static get observedAttributes() { return ['id', 'data-index'] }


})
