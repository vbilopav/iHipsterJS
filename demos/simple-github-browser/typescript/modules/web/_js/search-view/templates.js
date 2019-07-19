define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.title = String.html `
    <h3>
        <code>GitHub <img src="assets/github.ico" /></code> user search
    </h3>
`;
    exports.example = String.html `
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
    </details>
`;
    exports.notice = (test) => String.html `
    <details class="info-text">
        <summary>
        ${test ? String.html `
            <strong>Note:</strong> Currently working on local <strong>test sample of 100 records</strong>. 
        ` : String.html `
            <strong>Note:</strong> Rate limit for unauthenticated requests associated with the originating IP address is up to <strong>60 requests per hour</strong>. 
        `}
        </summary>
        ${test ? String.html `
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
    exports.resultsHeader = String.html `
    <div id="results-header" class="results-info">
        <code id="msg">results</code>
        <button id="next" onclick="nextClick">next</button>
        <button id="prev" onclick="prevClick">prev</button>
    </div>
`;
});
//# sourceMappingURL=templates.js.map