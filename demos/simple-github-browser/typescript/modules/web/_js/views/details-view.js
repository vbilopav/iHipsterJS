///<reference path="../../../../../../../src/ihjs/dev/types/core.d.ts"/>
define(["require", "exports", "../services/fetch-github", "./details-templates"], function (require, exports, fetch_github_1, details_templates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const test = window.ihjs.queryString.test;
    const html = String.html;
    const countLanguage = (lang, langs) => lang && (langs[lang] = { count: langs[lang] === undefined ? 1 : langs[lang].count + 1 });
    class default_1 {
        static paramsMap(params) {
            if (params.length > 0 && params.length < 3) {
                return {
                    login: params[0],
                    details: (params.length === 2 ? JSON.parse(params[1]) : undefined)
                };
            }
            return false; // not permitted 
        }
        async render(args) {
            this.login = args.params.login;
            let details;
            if (!args.params.details) {
                details = await fetch_github_1.default(`/users/${args.params.login}`, test);
            }
            else {
                details = args.params.details;
            }
            let encodedDetails = encodeURIComponent(JSON.stringify(details));
            return html `
        ${details_templates_1.userDetails(args.params.login, test, encodedDetails, details)}
        <div id="loading" style="text-align: center; margin-top: -20px;">...</div>
        <div id="followers" class="panel" style="display: none"></div>
        <div id="following" class="panel" style="display: none"></div>
        <div id="repos" class="panel" style="display: none"></div>
        <div id="gists" class="panel" style="display: none"></div>
        <div id="subscriptions" class="panel" style="display: none"></div>
        <div id="starred" class="panel" style="display: none"></div>
        `;
        }
        async rendered() {
            let loading = 1;
            let interval = setInterval(() => {
                this.model.loading.html(".".repeat(loading++));
                if (loading === 5) {
                    loading = 1;
                }
            }, 250);
            if (!await this.updateUsers("followers", "Followers"))
                return;
            if (!await this.updateUsers("following", "Following"))
                return;
            if (!await this.updateRepos("repos", "repos"))
                return;
            if (!await this.updateGists("gists", "gists"))
                return;
            if (!await this.updateRepos("subscriptions", "subscriptions"))
                return;
            !await this.updateRepos("starred", "starred");
            clearInterval(interval);
            this.model.loading.hideElement();
        }
        async updateRepos(endpoint, name) {
            let result = "", count = 0, element = this.model[endpoint], response = await fetch_github_1.default(`/users/${this.login}/${endpoint}`, test);
            let langs = new Array();
            if (response.message) {
                element.html(response.message).showElement();
                return false;
            }
            for (let key in response) {
                let item = response[key];
                count++;
                result += details_templates_1.formatCodeItem(item.name, item.language, item, item.html_url, item.description);
                countLanguage(item.language, langs);
            }
            element.html(details_templates_1.formatCodeResult(name, count, result, langs)).showElement();
            return true;
        }
        ;
        async updateGists(endpoint, name) {
            let result = "", count = 0, element = this.model[endpoint], response = await fetch_github_1.default(`/users/${this.login}/${endpoint}`, test);
            if (response.message) {
                element.html(response.message).showElement();
                return false;
            }
            let langs = new Array();
            for (let key in response) {
                let item = response[key];
                count++;
                let files = [];
                for (let file of Object.values(item.files)) {
                    files.push("<strong>" + file.filename + "</strong>" + (file.language ? "&nbsp;<code>" + file.language + "</code>" : ""));
                    countLanguage(file.language, langs);
                }
                result += details_templates_1.formatCodeItem(files, undefined, undefined, item.html_url, item.description);
            }
            element.html(details_templates_1.formatCodeResult(name, count, result, langs)).showElement();
            return true;
        }
        async updateUsers(endpoint, name) {
            let count = 0, element = this.model[endpoint], response = await fetch_github_1.default(`/users/${this.login}/${endpoint}`, test);
            if (response.message) {
                element.html(response.message).showElement();
                return false;
            }
            let users = [];
            for (let key in response) {
                let user = response[key];
                users.push(html `<span class="user-item"><a href="#/details/${user.login}"><img src="${user.avatar_url}" />&nbsp;${user.login}</a></span>`);
                count++;
            }
            element.html(html `
            <details>
                <summary><h4><code>${count}</code>&nbsp;${name}</h4></summary>
                <p>
                    ${users.join("")}
                </p>
                </details>`).showElement();
            return true;
        }
    }
    exports.default = default_1;
    ;
});
//# sourceMappingURL=details-view.js.map