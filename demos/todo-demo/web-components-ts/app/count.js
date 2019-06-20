define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let _count = 0;
    exports.setCount = (value) => _count = value;
    exports.increase = () => _count++;
    exports.decrease = () => _count--;
});
