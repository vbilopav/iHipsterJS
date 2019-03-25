define([], () => {
    return {
        getHtmlContent: (heading, body) => String.html`
        <div class="panel panel-default">
            <div class="panel-heading">${heading}</div>
            <div class="panel-body">
                ${body}
            </div>
        </div>
        `
    }
})
