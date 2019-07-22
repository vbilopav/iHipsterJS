define(["require", "exports", "../templates"], function (require, exports, templates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const html = String.html;
    exports.userDetails = (login, test, encodedDetails, details) => html `
    <h3>
        User details for user <code>${login}</code>
    </h3>
    <p>
        ${!test ? "" : html `
        <strong>Note:</strong> Currently working on local <strong>test sample</strong>. 
        Click 
        <a href="${document.location.pathname + document.location.hash}">
            <code>here</code>
        </a> to use real <code>GitHub <img src="assets/github.ico" /></code> data.
        `}
    </p>
    <button onclick="window.history.back();">Go back</button>
    <button onclick="() => this.route.router.navigateToRoute('/')">Return to search</button>

    ${test ? "" : html `
    <user-github-star class="details-star" data-item=${encodedDetails}></user-github-star>
    <a class="big-link" style="right: 25px;position: relative;top: 10px;" href="#/saved-items/">view saved items</a>
    `}
    <div class="panel">
        <a href="${details.html_url}"><img src="${test ? 'assets/github.ico' : details.avatar_url}" /></a>
        <ul class="item-details-list" id="list">
            <li>
                <strong>${details.type}:</strong>&nbsp;<a href="${details.html_url}">${login}</a>
            </li>

            ${details.message || templates_1.detailsList(details)}

            ${details.message ? "" : html `
            <li>
                <strong>Hireable:</strong>&nbsp;${details.hireable}
            </li>
            <li>
                <strong>Bio:</strong>&nbsp;${details.bio}
            </li>
            `}
        </ul>
    </div>`;
    exports.formatCodeItem = (name, lang, item, url, desc) => html `
    <li>
        ${typeof name === "string" ?
        html `<strong>${name}</strong>${lang ? html `"&nbsp;<code>{lang}</code>` : ""}&nbsp;` :
        name.join(", ")}
        ${item ?
        html `<span class=info-text>(${item.fork ? "forked, " : ""}&#11088;: <strong>${item.stargazers_count}</strong>, &#128065;: <strong>${item.watchers_count})</strong></span>&nbsp;`
        : ""}
        <a href="${url}" target=_blank>&#x2197;</a>
        ${desc ? html ` - <span class=info-text>${desc}</span>` : ""}
    </li>`;
    exports.formatCodeResult = (name, count, result, langs) => {
        if (count === 0) {
            return html `
        <details>
            <summary>
                <h4>No ${name} found!</h4>
            </summary>
        </details>`;
        }
        else {
            let sorted = Object.entries(langs).sort((a, b) => a[1].count - b[1].count).reverse().map(i => "<code>" + i[0] + "</code>" + " (" + i[1].count + ")").join(", ");
            return html `
        <details>
            <summary>
                <h4>
                    <code>${count}</code> ${name} - ${sorted}
                </h4>
            </summary>
            <ul class='item-detail-list'>${result}</ul>
        </details>`;
        }
    };
});
//# sourceMappingURL=details-templates.js.map