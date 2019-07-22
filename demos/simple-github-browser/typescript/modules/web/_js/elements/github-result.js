///<reference path="../../../../../../../src/ihjs/dev/types/core.d.ts"/>
define(["require", "exports", "../services/fetch-github", "../templates"], function (require, exports, fetch_github_1, templates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const test = window.ihjs.queryString.test;
    class Element extends HTMLElement {
    }
    const html = String.html;
    class default_1 {
        async render() {
            if (!this.element.details) {
                this.element.details = await fetch_github_1.default(`/users/${this.element.item.login}`, test);
            }
            let error = null;
            if (this.element.details.message) {
                error = html `<li>${this.element.details.message}</li>`;
            }
            let encodedDetails = encodeURIComponent(JSON.stringify(this.element.details));
            return html `
        <div class="panel">
            ${!error && !test ? html `<user-github-star data-item=${encodedDetails}></user-github-star>` : ""}
            <span class="panel-info">
                ${error != null ? "" : html `<a href="#/details/${this.element.item.login + (this.element.details ? '/' + encodedDetails : '')}">See more details</a>`}
                ${this.element.dataset.doNotShowScore ? "" : html `<div>Search score = ${this.element.item.score}</div>`}
            </span>
            <a href="${this.element.item.html_url}"><img src="${this.element.item.avatar_url}" /></a>
            <span class="item-info">
                <ul id="item-list">
                    <li>
                        <strong>${this.element.item.type}:</strong>&nbsp;<a href="${this.element.item.html_url}">${this.element.item.login}</a>
                    </li>
                    ${error || templates_1.detailsList(this.element.details)}
                </ul>
            </span>
        </div>`;
        }
    }
    exports.default = default_1;
    ;
});
//# sourceMappingURL=github-result.js.map