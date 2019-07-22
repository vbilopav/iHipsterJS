///<reference path="../../../../../../../src/ihjs/dev/types/core.d.ts"/>

import fetchGitHub from "../services/fetch-github";
import {detailsList} from "../templates";
import {githubDetails, githubSearchItem} from "../interfaces";

const test: boolean = window.ihjs.queryString.test;
class Element extends HTMLElement {
    details: githubDetails;
    item: githubSearchItem;
}
const html = String.html;

export default class implements IView {
    private element: Element;

    async render() { 
        if (!this.element.details) {
            this.element.details = await fetchGitHub(`/users/${this.element.item.login}`, test);
        }
        let error: string = null;
        if (this.element.details.message) {
            error = html`<li>${this.element.details.message}</li>`; 
        }
        let encodedDetails: string = encodeURIComponent(JSON.stringify(this.element.details));

        return html`
        <div class="panel">
            ${!error && !test ? html`<user-github-star data-item=${encodedDetails}></user-github-star>` : ""}
            <span class="panel-info">
                ${error != null ? "" : html`<a href="#/details/${this.element.item.login + (this.element.details ? '/' + encodedDetails : '')}">See more details</a>`}
                ${this.element.dataset.doNotShowScore ? "" : html`<div>Search score = ${this.element.item.score}</div>`}
            </span>
            <a href="${this.element.item.html_url}"><img src="${this.element.item.avatar_url}" /></a>
            <span class="item-info">
                <ul id="item-list">
                    <li>
                        <strong>${this.element.item.type}:</strong>&nbsp;<a href="${this.element.item.html_url}">${this.element.item.login}</a>
                    </li>
                    ${error || detailsList(this.element.details)}
                </ul>
            </span>
        </div>`;
    }
};