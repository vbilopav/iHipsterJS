define(["require", "exports", "demos/todo-demo/web-components-ts/app/count"], function (require, exports, count_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class default_1 extends HTMLElement {
        constructor() {
            super();
            let dataIndex = this.getAttribute("data-index");
            let html = this.innerHTML;
            this.innerHTML = String.html `
        <div class="ToDoItem" id="item">
            <p class="ToDoItem-Text">${dataIndex + ". " + html}</p>
            <div class="ToDoItem-Delete" onclick="deleteClick">-</div>
        </div>`;
        }
        deleteClick() {
            count_1.decrease();
            this.model.item.parentElement.remove();
        }
    }
    exports.default = default_1;
    ;
});
