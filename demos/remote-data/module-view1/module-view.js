define([], () => class {

    constructor() {
        window.on("click", e => {
            if (e.target.data("openModal") != "1") {
                this.model.modalWin.hide();
            }
        });
    }

    async render() {
        let result = String.html`
            <div class="container-fluid">
                <p class="text-center">
                    <h2>JavaScript application frameworks</h2>
                </p>
            `;
        
        for(let [name, item] of Object.entries(await _app.fetch("../../shared/frameworks.json"))) {
            result += String.html`
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span>${name}</span>
                        <a 
                            data-open-modal="1" style="float: right;" href='#' 
                            onclick="() => this.showDescriptionClick('${name}', '${item.Description}');">show description
                        </a>
                    </div>
                    <ul class="list-group">
                `;
            
            for(let [key, value] of Object.entries(item)) {
                result += String.html`
                    <li class="list-group-item">
                        <strong>${key}: </strong>${value}
                    </li>
                `;
            }

            result += String.html`
                    </ul>
                </div>
                `;
        }
        
        result += String.html`
            <div name="modalWin" class="modal" style="display: none;">
                <div class="modal-content">
                    <span class="close" onclick="()=>this.model.modalWin.hide();">&times;</span>
                    <p name="title"></p>
                    <p name="description"></p>
                </div>
            </div>
        `;
        return result;
    }

    showDescriptionClick(name, description) {
        this.model.title.html(name);
        this.model.description.html(description);
        this.model.modalWin.show();
        return false;
    }


    rendered({element}) {
        console.log("Template rendered into element:");
        console.log(element);
        console.log("I also have following model defined:");
        console.log(this.model);
    }

})