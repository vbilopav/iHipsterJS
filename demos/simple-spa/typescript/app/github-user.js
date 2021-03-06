define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class default_1 {
        constructor() {
            this.context = {
                username: window.ihjs.queryString || "vbilopav"
            };
        }
        render() {
            return String.html `
            <div class="container-fluid">
                <h3>Github user data</h3>
                <input type="text" name="username">
                <button name="show" onclick="showClick">Show github user data</button>
            </div>`;
        }
        showClick() {
            window.location.href = "#/github-user-info/" + this.model.username.value;
        }
    }
    exports.default = default_1;
    ;
});
