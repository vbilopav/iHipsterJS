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
            this.model = new window._app.Model().bind(this, this);
        }
        deleteClick() {
            count_1.decrease();
            this.model.item.remove();
        }
        static get observedAttributes() {
            return ['id', 'data-index'];
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            console.log(attrName + " attribute set to " + newVal);
        }
    }
    exports.default = default_1;
    ;
});
