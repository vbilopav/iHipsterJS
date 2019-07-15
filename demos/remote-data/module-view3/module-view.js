define(["template-functions!templates.html"], ({headerTemplate, itemTemplate}) => class {

    async render() {
        let result = String.html`
            <div class="container-fluid">
                <p class="text-center">
                    <h2>JavaScript application frameworks</h2>
                </p>
            `;
        
        for(let [name, item] of Object.entries(await ihjs.fetch("../../shared/frameworks.json"))) {
            result += String.html`
                <div class="panel panel-default">
                    ${headerTemplate(name)}
                    <ul class="list-group">
                `;
            
            for(let [key, value] of Object.entries(item)) {
                result += itemTemplate(key, value);
            }

            result += String.html`
                    </ul>
                </div>
                `;
        }
        
        return result;
    }


    rendered({element}) {
        console.log("Template rendered into element:");
        console.log(element);
        console.log("I also have following model defined:");
        console.log(this.model);
    }

})