///<reference path="../../../../../../../src/ihjs/dev/types/core.d.ts"/>
define(["require", "exports", "services/fetch-github", "../templates"], function (require, exports, fetch_github_1, templates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const test = window.ihjs.queryString.test;
    class default_1 extends HTMLElement {
        async render() {
            if (!this.details) {
                this.details = await fetch_github_1.default(`/users/${this.item.login}`, test);
            }
            let error = null;
            if (this.details.message) {
                error = String.html `<li>${this.details.message}</li>`;
            }
            let encodedDetails = encodeURIComponent(JSON.stringify(this.details));
            return String.html `
        <div class="panel">
            ${!error && !test ? String.html `<user-github-star data-item=${encodedDetails}></user-github-star>` : ""}
            <span class="panel-info">
                ${error != null ? "" : String.html `<a href="#/details/${this.item.login + (this.details ? '/' + encodedDetails : '')}">See more details</a>`}
                ${this.dataset.doNotShowScore ? "" : String.html `<div>Search score = ${this.item.score}</div>`}
            </span>
            <a href="${this.item.html_url}"><img src="${this.item.avatar_url}" /></a>
            <span class="item-info">
                <ul id="item-list">
                    <li>
                        <strong>${this.item.type}:</strong>&nbsp;<a href="${this.item.html_url}">${this.item.login}</a>
                    </li>
                    ${error || templates_1.detailsList(this.details)}
                </ul>
            </span>
        </div>`;
        }
    }
    exports.default = default_1;
    ;
});
//# sourceMappingURL=github-result.js.map