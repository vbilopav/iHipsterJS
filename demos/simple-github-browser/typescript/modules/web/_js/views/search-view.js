///<reference path="../../../../../../../src/ihjs/dev/types/core.d.ts"/>
define(["require", "exports", "./search-templates", "../services/fetch-github"], function (require, exports, search_templates_1, fetch_github_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const pageSize = 5;
    const test = window.ihjs.queryString.test;
    class default_1 {
        static paramsMap(params) {
            if (params.length > 2) {
                return false;
            }
            let page = (params.length > 0 ? Number(params[0]) : 1);
            if (isNaN(page)) {
                page = 1;
            }
            return {
                page: page,
                query: (params.length > 1 ? params[1] : "")
            };
        }
        render(args) {
            this.params = args.params;
            return String.html `
        <p>
            <label for="query">
                ${search_templates_1.title}
                <p>
                    ${search_templates_1.example}
                </p>
                ${search_templates_1.notice(test)}
            </label>
        </p>
        <p>
            <input id="query" 
                onkeypress="queryKeyPress" 
                onfocus="this.select()" 
                type="text" 
                placeholder="search box" 
                autofocus 
                spellcheck="false" 
                autocomplete="off"
            />
            <a class="big-link" href="#/saved-items/">view saved items</a>
            <button id="search" onclick="searchClick">search</button>
        </p>

        ${search_templates_1.resultsHeader}
        <div id="results"></div>
        ${search_templates_1.resultsHeader}
        `;
        }
        async rendered() {
            await this.performSearch();
        }
        exampleClick(e) {
            this.model.query.value = e.target.innerText.trim();
            this.model.query.focus();
        }
        queryKeyPress(e) {
            e.keyCode === 13 && this.model.search.click();
        }
        searchClick() {
            this.navigate(1, this.model.query.value.replace(new RegExp('/', 'g'), ''));
        }
        nextClick() {
            this.navigate(this.params.page++, this.params.query);
        }
        prevClick() {
            this.navigate(this.params.page--, this.params.query);
        }
        navigate(page, query) {
            document.location.hash = `#/${page}/${query}`;
        }
        enableNextPrev(next, prev, hideLast = false) {
            // toggle disabled attributes
            this.model.prev.attr("disabled", "", !prev);
            this.model.next.attr("disabled", "", !next);
            this.model.resultsHeader[1].showElement(!hideLast);
        }
        async performSearch() {
            this.model.results.html("");
            this.model.resultsHeader.hideElement();
            if (!this.params.query) {
                return;
            }
            const result = await fetch_github_1.default(`/search/users?q=${this.params.query}&page=${this.params.page}&per_page=${pageSize}`, test);
            this.model.resultsHeader.showElement();
            if (result.message) {
                this.model.msg.html(result.message);
                this.enableNextPrev(false, false, true);
                return;
            }
            this.model.msg.html(`Results ${(this.params.page * pageSize) - pageSize + 1}-${this.params.page * pageSize} of total ${result.total_count}.`);
            for (let item of result.items) {
                let element = String.html `<github-result></github-result>`.dom();
                element["item"] = item;
                this.model.results.append(element);
            }
            ;
            this.enableNextPrev(this.params.page <= Math.floor(result.total_count / pageSize), this.params.page > 1, false);
        }
    }
    exports.default = default_1;
    ;
});
//# sourceMappingURL=search-view.js.map