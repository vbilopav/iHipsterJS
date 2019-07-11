///<reference path="../../../../src/ihjs/dev/types/core.d.ts"/>

type paramsType = {page: number, query: string};
type renderArg = {params: paramsType};

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

    render(args: renderArg) {
        return String.html`
        <p>
            <label for="query">
            <h3>
                Enter valid <code>GitHub <img src="assets/github.ico" /></code> query into search box and hit key <code>enter</code> or <code>search</code> button.
            </h3>
            <div class="info-text ">
                <span>Example of search query 
                <code class="example" onclick="e => {this.model.query.value = e.target.innerText.trim(); this.model.query.focus();}">
                    vbilopav repos:>20 followers:>10
                </code> - 
                    username or email starts with "vbilopav" and with more than 20 repositories, and only if they have over 10 followers. See
                    <a href="https://developer.github.com/v3/search/#constructing-a-search-query" target="_blank">docs &nbsp;&#x2197;</a> for more info.
                </span>
                <p>
                ${window.ihjs.queryString.test ? String.html`
                    <strong>Note:</strong> Currently working on local <strong>test sample of 100 records</strong>. 
                    Click <a href="${document.location.pathname + document.location.hash}"><code>here</code></a> to use real <code>GitHub <img src="assets/github.ico" /></code> data.
                    `
                    :
                    String.html`
                    <strong>Note:</strong> Rate limit for unauthenticated requests associated with the originating IP address is up to <strong>60 requests per hour</strong>. 
                    To increase your requests limit up to <strong>5000 requests per hour</strong>, you'll need to 
                    <code>
                        <a href="authorize" onclick="e => {e.preventDefault(); window.open('authorize.html', '_blank', 'menubar=no, width=800,height=600');}">login to your GitHub account</a>
                    </code>
                    or click <a href="${document.location.pathname + '?test=true' + document.location.hash}"><code>here</code></a> to use local <strong>test sample of 100 records</strong>.
                    `
                }
                </p>
            </div>
        </label>
        <p>
            <input 
                type="text" id="query" 
                placeholder="search box" autofocus 
                spellcheck="false" 
                autocomplete="off"
                onkeypress="e => e.keyCode === 13 && this.model.search.click()"
                onfocus="this.select()"
            />
            <a class="big-link" href="#/saved-items/">view saved items</a>
            <button id="search" onclick="() => document.location.hash = '#/1/' + this.model.query.value.replace(new RegExp('/', 'g'), '')">search</button>
        </p>
        
        <div id="results-header" class="results-info">
            <code id="msg">results</code>
            <button id="next" onclick="() => document.location.hash = '#/' + ++this.page + '/' + this.query">next</button>
            <button id="prev" onclick="() => document.location.hash = '#/' + --this.page + '/' + this.query">prev</button>
        </div>

        <div id="results">
        </div>

        <div id="results-header" class="results-info">
            <code id="msg">results</code>
            <button id="next" onclick="() => document.location.hash = '#/' + ++this.page + '/' + this.query">next</button>
            <button id="prev" onclick="() => document.location.hash = '#/' + --this.page + '/' + this.query">prev</button>
        </div>
    `;
    }
};