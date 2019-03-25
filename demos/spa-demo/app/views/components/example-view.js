define([], () => class {

    render() {
        return String.html`
            <div class="panel panel-default">
                <div class="panel-heading">Simple component</div>
                <div class="panel-body">
                    Simple component body
                    <br /><br />
                </div>
            </div>`
    }

    rendered(args) {
        console.log(args);
    }
});