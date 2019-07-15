///<reference path="../../../../../../src/ihjs/dev/types/core.d.ts"/>
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const pageSize = 5;
    const title = String.html `
<h3>
    Enter valid 
    <code>GitHub <img src="assets/github.ico" /></code> query into search box and hit key 
    <code>enter</code> or <code>search</code> button.
</h3>`;
    const example = String.html `
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
    const notice = String.html `
<details class="info-text">
    <summary>
    ${window.ihjs.queryString.test ? String.html `
        <strong>Note:</strong> Currently working on local <strong>test sample of 100 records</strong>. 
    ` : String.html `
        <strong>Note:</strong> Rate limit for unauthenticated requests associated with the originating IP address is up to <strong>60 requests per hour</strong>. 
    `}
    </summary>
    ${window.ihjs.queryString.test ? String.html `
        Click <a href="${document.location.pathname + document.location.hash}"><code>here</code></a> to use real <code>GitHub <img src="assets/github.ico" /></code> data.
    ` : String.html `
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
    const resultsHeader = String.html `
<div id="results-header" class="results-info">
    <code id="msg">results</code>
    <button id="next" onclick="nextClick">next</button>
    <button id="prev" onclick="prevClick">prev</button>
</div>`;
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
                ${title}
                <p>
                    ${example}
                </p>
                ${notice}
            </label>
        </p>
        
        <p>
            <input id="query" onkeypress="queryKeyPress" onfocus="this.select()" type="text" placeholder="search box" autofocus spellcheck="false" autocomplete="off" />
            <a class="big-link" href="#/saved-items/">view saved items</a>
            <button id="search" onclick="searchClick">search</button>
        </p>
        
        ${resultsHeader}
        <div id="results"></div>
        ${resultsHeader}
        
        `;
        }
        exampleClick(e) {
            this.model.query.value = e.target.innerText.trim();
            this.model.query.focus();
        }
        authorizeClick(e) {
            e.preventDefault();
            window.open("authorize.html", "_blank", "menubar=no, width=800,height=600");
        }
        queryKeyPress(e) {
            e.keyCode === 13 && this.model.search.click();
        }
        searchClick() {
            document.location.hash = '#/1/' + this.model.query.value.replace(new RegExp('/', 'g'), '');
        }
        nextClick() {
            document.location.hash = '#/' + (++this.params.page) + '/' + this.params.query;
        }
        prevClick() {
            document.location.hash = '#/' + (--this.params.page) + '/' + this.params.query;
        }
        rendered() {
            console.log(this.model.query);
        }
    }
    exports.default = default_1;
    ;
});
//# sourceMappingURL=search.js.map