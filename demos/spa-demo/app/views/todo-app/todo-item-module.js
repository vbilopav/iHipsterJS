define([], () => class {

    render({params}) {
        return String.html`
            <div class="ToDoItem">
                <p class="ToDoItem-Text">${params}</p>
                <div class="ToDoItem-Delete" onclick="this.parentElement.remove()">-</div>
            </div>`
    }

})

