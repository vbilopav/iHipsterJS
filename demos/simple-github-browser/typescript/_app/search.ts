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
        console.log(args.params.page)
        return String.html`
        <label for="query">
            <h3>Enter valid 
                <code>GitHub 
                    <img src="assets/github.ico" />
                </code> query into search box and hit key 
                <code>enter</code> or <code>search</code> button.
            </h3>
            <div class="info-text ">
                <span>Example of search query 
                    <code class="example" onclick="e => {this.model.query.value = e.target.innerText.trim(); this.model.query.focus();}">
                        tom repos:>42 followers:>1000
                    </code> - 
                    username or email starts with "tom" and with more than 42 repositories, and only if they have over 1,000 followers. See
                    <a href="https://developer.github.com/v3/search/#constructing-a-search-query" target="_blank">docs &nbsp;&#x2197;</a> for more info.
                </span>
            </div>
        </label>
    `;
    }
};