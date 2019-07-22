///<reference path="../../../../../../../src/ihjs/dev/types/pubsub.d.ts"/>
define(["require", "exports", "ihjs/pubsub"], function (require, exports, pubsub_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class default_1 {
        async render() {
            this.data = JSON.parse(decodeURIComponent(this.element.dataset.item));
            this.key = "item-" + this.data.id;
            this.saved = localStorage.getItem(this.key) !== null;
            pubsub_1.subscribe("item/toggle/" + this.data.id, state => {
                this.saved = state;
                this.starElement();
            });
            return String.html `<div id="star" class="panel-save" onclick="starClick"></div>`;
        }
        rendered() {
            this.starElement();
        }
        starClick() {
            if (!this.saved) {
                localStorage.setItem(this.key, JSON.stringify(this.data));
                this.saved = true;
                pubsub_1.publish("item/saved", this.key);
                pubsub_1.publish("item/toggle/" + this.data.id, true);
            }
            else {
                localStorage.removeItem(this.key);
                this.saved = false;
                pubsub_1.publish("item/removed", this.key);
                pubsub_1.publish("item/toggle/" + this.data.id, false);
            }
            this.starElement();
        }
        starElement() {
            const e = this.model.star;
            if (this.saved) {
                e.html("&#11088;").attr("title", "remove from saved");
            }
            else {
                e.html("&#10032;").attr("title", "save");
            }
        }
        ;
    }
    exports.default = default_1;
    ;
});
//# sourceMappingURL=user-github-star.js.map