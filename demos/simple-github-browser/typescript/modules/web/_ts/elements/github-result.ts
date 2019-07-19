///<reference path="../../../../../../../src/ihjs/dev/types/core.d.ts"/>

import fetchGitHub from "services/fetch-github";
import {detailsList} from "../templates";
import {githubDetails, githubSearchItem} from "interfaces";

const test: boolean = window.ihjs.queryString.test;

export default class extends HTMLElement implements IView {
    private details: githubDetails;
    private item: githubSearchItem;

    async render() { 
        if (!this.details) {
            this.details = await fetchGitHub(`/users/${this.item.login}`, test);
        }
        let error: string = null;
        if (this.details.message) {
            error = String.html`<li>${this.details.message}</li>`; 
        }
        let encodedDetails: string = encodeURIComponent(JSON.stringify(this.details));

        return String.html`
        <div class="panel">
            ${!error && !test ? String.html`<user-github-star data-item=${encodedDetails}></user-github-star>` : ""}
            <span class="panel-info">
                ${error != null ? "" : String.html`<a href="#/details/${this.item.login + (this.details ? '/' + encodedDetails : '')}">See more details</a>`}
                ${this.dataset.doNotShowScore ? "" : String.html`<div>Search score = ${this.item.score}</div>`}
            </span>
            <a href="${this.item.html_url}"><img src="${this.item.avatar_url}" /></a>
            <span class="item-info">
                <ul id="item-list">
                    <li>
                        <strong>${this.item.type}:</strong>&nbsp;<a href="${this.item.html_url}">${this.item.login}</a>
                    </li>
                    ${error || detailsList(this.details)}
                </ul>
            </span>
        </div>`;
    }
};