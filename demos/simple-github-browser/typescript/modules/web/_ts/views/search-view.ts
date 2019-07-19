///<reference path="../../../../../../../src/ihjs/dev/types/core.d.ts"/>

import {title, example, notice, resultsHeader} from "views/search-templates";
import fetchGitHub from "services/fetch-github";


type paramsType = {page: number, query: string};
type renderArg = {params: paramsType};
const pageSize = 5;
const test: boolean = window.ihjs.queryString.test;


export default class implements IView {

    model: {
        query: HTMLInputElement,
        search: HTMLButtonElement,
        resultsHeader: HTMLModelArray,
        results: HTMLElement,
        msg: HTMLModelArray,
        next: HTMLModelArray,
        prev: HTMLModelArray
    }

    params: paramsType

    static paramsMap(params: Array<string>): false | paramsType {
        if (params.length > 2) {
            return false;
        }
        let page: number = (params.length > 0 ? Number(params[0]) : 1)
        if (isNaN(page)) {
            page = 1;
        }
        return {
            page: page,
            query: (params.length > 1 ? params[1] : "")
        }
    }

    render(args: renderArg) { 
        this.params = args.params;
        return String.html`
        <p>
            <label for="query">
                ${title}
                <p></p>
                    ${example}
                </p>
                ${notice(test)}
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
        ${resultsHeader}
        <div id="results"></div>
        ${resultsHeader}
        `;
    }

    async rendered() {
        await this.performSearch();
    }

    exampleClick(e: MouseEvent) {
        this.model.query.value = (e.target as HTMLElement).innerText.trim(); 
        this.model.query.focus();
    }

    authorizeClick(e: MouseEvent) {
        e.preventDefault(); 
        window.open("authorize.html", "_blank", "menubar=no, width=800,height=600");
    }

    queryKeyPress(e: KeyboardEvent) {
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

    private navigate(page: number, query: string) {
        document.location.hash = `#/${page}/${query}`;
    }

    private enableNextPrev(next: boolean, prev: boolean, hideLast=false) {
        // toggle disabled attributes
        this.model.prev.attr("disabled", "", !prev);
        this.model.next.attr("disabled", "", !next);
        this.model.resultsHeader[1].showElement(!hideLast);
    }

    private async performSearch() {
        this.model.results.html("");
        this.model.resultsHeader.hideElement();
        if (!this.params.query) {
            return;
        }
        const result = await fetchGitHub(`/search/users?q=${this.params.query}&page=${this.params.page}&per_page=${pageSize}`, test);
        this.model.resultsHeader.showElement();
        if (result.message) {
            this.model.msg.html(result.message);
            this.enableNextPrev(false, false, true);
            return;
        }
        this.model.msg.html(`Results ${(this.params.page * pageSize) - pageSize + 1}-${this.params.page * pageSize} of total ${result.total_count}.`)
        for(let item of result.items) {
            let element: HTMLElement = String.html`<github-result></github-result>`.dom();
            element["item"] = item;
            this.model.results.append(element);
        };
        this.enableNextPrev(this.params.page <= Math.floor(result.total_count / pageSize), this.params.page > 1, false);
    }
};