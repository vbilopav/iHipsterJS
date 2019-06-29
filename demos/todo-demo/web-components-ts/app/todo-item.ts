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
    }

    deleteClick() {
        decrease();
        this.model.item.parentElement.remove();
    }
};
