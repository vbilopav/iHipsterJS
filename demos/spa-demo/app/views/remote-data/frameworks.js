define([], () => class {

    render() { 
        return String.html`
        <div>
            <h3>Master/detail example with fetcing remote data</h3>
            <p>
                List of JavaScript frameworks:
                <br /><hr />
                <span id="anchors"></span>
            <hr />
            </p>
        </div>`
    }
    
    async rendered() {
        let 
            data = await(await fetch("../shared/frameworks.json", {cache: "no-store"})).json(),
            anchorsHtml = Object.keys(data).map(
                item => `<a href="#/remote-data-example/details/${item}">View details for ${item}</a><br />`
            ).join("");

        // rendered event will only be triggered once since this view doesn't allow params
        this.model.anchors = anchorsHtml;
    }
    
})
