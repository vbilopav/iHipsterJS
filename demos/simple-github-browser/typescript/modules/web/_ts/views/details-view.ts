///<reference path="../../../../../../../src/ihjs/dev/types/core.d.ts"/>

import fetchGitHub from "../services/fetch-github";
import {userDetails, formatCodeItem, formatCodeResult} from "./details-templates";
import {githubDetails, githubResponse} from "../interfaces";


type paramsType = {
    login: string,
    details?: githubDetails
};
type renderArg = {params: paramsType};
const test: boolean = window.ihjs.queryString.test;
const html = String.html;
const countLanguage = (lang: string, langs: Array<{count: number}>) =>
        lang && (langs[lang] = {count: langs[lang] === undefined ? 1 : langs[lang].count + 1});

export default class implements IView {

    private login: string;
    private model: {
        loading: HTMLElement,
        followers: HTMLElement,
        following: HTMLElement,
        repos: HTMLElement,
        gists: HTMLElement,
        starred: HTMLElement
    }

    static paramsMap(params: Array<string>): false | paramsType {
        if (params.length > 0 && params.length < 3) {
            return {
                login: params[0], 
                details: (params.length === 2 ? JSON.parse(params[1]) : undefined)
            }
        }
        return false; // not permitted 
    }

    async render(args: renderArg) { 
        this.login = args.params.login;
        let details: githubDetails;
        if (!args.params.details) {
            details = await fetchGitHub(`/users/${args.params.login}`, test);
        } else {
            details = args.params.details;
        }
        let encodedDetails = encodeURIComponent(JSON.stringify(details));

        return html`
        ${userDetails(args.params.login, test, encodedDetails, details)}
        <div id="loading" style="text-align: center; margin-top: -20px;">...</div>
        <div id="followers" class="panel" style="display: none"></div>
        <div id="following" class="panel" style="display: none"></div>
        <div id="repos" class="panel" style="display: none"></div>
        <div id="gists" class="panel" style="display: none"></div>
        <div id="subscriptions" class="panel" style="display: none"></div>
        <div id="starred" class="panel" style="display: none"></div>
        `
    }

    async rendered() {
        let loading = 1;
        let interval = setInterval(() => {
            this.model.loading.html(".".repeat(loading++));
            if (loading === 5) {
                loading = 1;
            }
        }, 250);
        if (!await this.updateUsers("followers", "Followers")) return;
        if (!await this.updateUsers("following", "Following")) return;
        if (!await this.updateRepos("repos", "repos")) return;
        if (!await this.updateGists("gists", "gists")) return;
        if (!await this.updateRepos("subscriptions", "subscriptions")) return;
        !await this.updateRepos("starred", "starred");

        clearInterval(interval);
        this.model.loading.hideElement();
    }

    private async updateRepos(endpoint: string, name: string) {
        let result = "", 
            count = 0, 
            element = this.model[endpoint] as HTMLElement, 
            response = await fetchGitHub(`/users/${this.login}/${endpoint}`, test);
        let langs  = new Array<{count: number}>();
        if (response.message) {
            element.html(response.message).showElement();
            return false;
        }
        for (let key in response) {
            let item = response[key];
            count++;
            result += formatCodeItem(item.name, item.language, item, item.html_url, item.description);
            countLanguage(item.language, langs);
        }
        element.html(formatCodeResult(name, count, result, langs)).showElement();
        return true;
    };

    private async updateGists(endpoint: string, name: string) {
        let result = "", 
            count = 0, 
            element = this.model[endpoint] as HTMLElement, 
            response = await fetchGitHub(`/users/${this.login}/${endpoint}`, test);
        if (response.message) {
            element.html(response.message).showElement();
            return false;
        }
        let langs  = new Array<{count: number}>();
        for (let key in response) {
            let item = response[key] as githubResponse;
            count++;
            let files = [];
            for(let file of Object.values(item.files)) {
                files.push("<strong>" + file.filename + "</strong>" + (file.language ? "&nbsp;<code>" + file.language + "</code>" : ""));
                countLanguage(file.language, langs);
            }
            result += formatCodeItem(files, undefined, undefined, item.html_url, item.description);
        }
        element.html(formatCodeResult(name, count, result, langs)).showElement();
        return true;
    }

    private async updateUsers(endpoint: string, name: string) {
        let count = 0, 
            element = this.model[endpoint], 
            response = await fetchGitHub(`/users/${this.login}/${endpoint}`, test);
        if (response.message) {
            element.html(response.message).showElement();
            return false;
        }
        let users = [];
        for (let key in response) {
            let user = response[key] as githubResponse;
            users.push(
                html`<span class="user-item"><a href="#/details/${user.login}"><img src="${user.avatar_url}" />&nbsp;${user.login}</a></span>`
            );
            count++;
        }
        element.html(html`
            <details>
                <summary><h4><code>${count}</code>&nbsp;${name}</h4></summary>
                <p>
                    ${users.join("")}
                </p>
                </details>`
        ).showElement();
        return true
    }


};