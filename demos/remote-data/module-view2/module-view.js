define([], () => class {

    constructor() {
        this._descriptionsDict = {};
        window.on("click", e => {
            if (e.target.dataAttr("openModal") != "1") {
                this.model.modalWin.hideElement();
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
            this._descriptionsDict[name] = item.Description;
            result += String.html`
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span>${name}</span>
                        <a 
                            data-open-modal="1" 
                            data-name="${name}" 
                            style="float: right;" href='#' 
                            onclick="showDescriptionClick">show description
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
                    <span class="close" onclick="()=>this.model.modalWin.hideElement();">&times;</span>
                    <p name="title"></p>
                    <p name="description"></p>
                </div>
            </div>
        `;
        return result;
    }

    showDescriptionClick(e) {
        let name = e.target.dataAttr("name");
        this.model.title.html(name);
        this.model.description.html(this._descriptionsDict[name]);
        this.model.modalWin.showElement();
        e.preventDefault();
    }


    rendered({element}) {
        console.log("Template rendered into element:");
        console.log(element);
        console.log("I also have following model defined:");
        console.log(this.model);
    }

})