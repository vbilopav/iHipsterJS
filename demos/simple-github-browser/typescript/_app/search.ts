///<reference path="../../../../src/ihjs/dev/types/core.d.ts"/>

type paramsType = {page: number, query: string};
type renderArg = {params: paramsType};
const pageSize = 5;

export default class implements IView {

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

    model: {
        query: HTMLInputElement,
        search: HTMLButtonElement
    }

    params: paramsType

    title: string = String.html`
    <h3>
        Enter valid 
        <code>GitHub <img src="assets/github.ico" /></code> query into search box and hit key 
        <code>enter</code> or <code>search</code> button.
    </h3>`;

    example: string = String.html`
    <details class="info-text">
        <summary>
            <span>
                Example of search query
                <code class="example" onclick="exampleClick">vbilopav repos:>20 followers:>10</code>
            </span>
        </summary>
            <span>
                username or email starts with "vbilopav" and with more than 20 repositories, and only if they have over 10 followers. See
                <a href="https://developer.github.com/v3/search/#constructing-a-search-query" target="_blank">docs &nbsp;&#x2197;</a> for more info.
            </span>
    </details>`;

    notice: string = String.html`
    <details class="info-text">
        <summary>
        ${window.ihjs.queryString.test ? String.html`
            <strong>Note:</strong> Currently working on local <strong>test sample of 100 records</strong>. 
        ` : String.html`
            <strong>Note:</strong> Rate limit for unauthenticated requests associated with the originating IP address is up to <strong>60 requests per hour</strong>. 
        `}
        </summary>
        ${window.ihjs.queryString.test ? String.html`
            Click <a href="${document.location.pathname + document.location.hash}"><code>here</code></a> to use real <code>GitHub <img src="assets/github.ico" /></code> data.
        ` : String.html`
            To increase your requests limit up to <strong>5000 requests per hour</strong>, you'll need to 
            <code>
                <a href="authorize" onclick="authorizeClick">login to your GitHub account</a>
            </code>
            or click 
            <a href="${document.location.pathname + '?test=true' + document.location.hash}">
                <code>here</code>
            </a> 
            to use local <strong>test sample of 100 records</strong>.
        `}
    </details>
    `;

    resultsHeader: string = String.html`
    <div id="results-header" class="results-info">
        <code id="msg">results</code>
        <button id="next" onclick="nextClick">next</button>
        <button id="prev" onclick="prevClick">prev</button>
    </div>`;

    render(args: renderArg) { 
        this.params = args.params
        return String.html`
        <p>
            <label for="query">
                ${this.title}
                <p>
                    ${this.example}
                </p>
                ${this.notice}
            </label>
        <p>
            <input id="query" onkeypress="queryKeyPress" onfocus="this.select()" type="text" placeholder="search box" autofocus spellcheck="false" autocomplete="off" />
            <a class="big-link" href="#/saved-items/">view saved items</a>
            <button id="search" onclick="searchClick">search</button>
        </p>
        
        ${this.resultsHeader}
        <div id="results"></div>
        ${this.resultsHeader}
    `;
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
        e.keyCode === 13 && this.model.search.click()
    }

    searchClick() {
        document.location.hash = '#/1/' + this.model.query.value.replace(new RegExp('/', 'g'), '')
    }

    nextClick() {
        document.location.hash = '#/' + (++this.params.page) + '/' + this.params.query
    }

    prevClick() {
        document.location.hash = '#/' + (--this.params.page) + '/' + this.params.query
    }
};