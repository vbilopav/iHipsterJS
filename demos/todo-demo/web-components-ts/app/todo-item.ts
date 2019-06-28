///<reference path="../../../../src/ihjs/build/1.1.2/types/core.d.ts"/>

import {decrease} from "demos/todo-demo/web-components-ts/app/count";

export default class extends HTMLElement {
    model: {
        item: HTMLElement
    }

    constructor() {
        super();

        let dataIndex = this.getAttribute("data-index");
        let html = this.innerHTML;

        this.innerHTML = String.html`
        <div class="ToDoItem" id="item">
            <p class="ToDoItem-Text">${dataIndex + ". " + html}</p>
            <div class="ToDoItem-Delete" onclick="deleteClick">-</div>
        </div>`;
        
        this.model = new window._app.Model().bind(this, this);
    }

    deleteClick() {
        decrease();
        this.model.item.parentElement.remove();
    }

    // The browser calls the attributeChangedCallback() for any attributes whitelisted in the observedAttributes array 
    static get observedAttributes() {
        return ['id', 'data-index'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(attrName + " attribute set to " + newVal);
    }
};
