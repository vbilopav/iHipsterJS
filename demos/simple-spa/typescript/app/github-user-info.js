define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class default_1 {
        async render(args) {
            let user = args.params.value;
            let response = await fetch(`https://api.github.com/users/${user}`);
            let result = String.html `
            <div>
                <h2>Github user data</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th colspan=2>${user}</th>
                            </tr>
                        </thead>
                        <tbody>`;
            for (let [key, value] of Object.entries(await response.json())) {
                result += String.html `
                            <tr>
                                <td>${key}</td>
                                <td>${value}</td>
                            </tr>`;
            }
            result += String.html `
                        </tbody>
                    </table>
                </div>
                <button onclick="window.history.back();">Go back</button>
            </div>`;
            return result;
        }
        rendered(args) {
            console.log("rendered", args);
        }
        revealed(args) {
            console.log("revealed", args);
        }
    }
    exports.default = default_1;
    ;
});
