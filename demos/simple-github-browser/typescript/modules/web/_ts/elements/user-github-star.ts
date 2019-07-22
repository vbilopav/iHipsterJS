///<reference path="../../../../../../../src/ihjs/dev/types/pubsub.d.ts"/>

import {publish, subscribe} from "ihjs/pubsub";
import {githubDetails} from "../interfaces";


export default class implements IView {
    private element: HTMLElement;
    private data: githubDetails;
    private key: string;
    private saved: boolean;
    private model: {
        star: HTMLElement
    }

    async render() { 
        this.data = JSON.parse(decodeURIComponent(this.element.dataset.item));
        this.key = "item-" + this.data.id;
        this.saved = localStorage.getItem(this.key) !== null;
        subscribe("item/toggle/" + this.data.id, state => {
            this.saved = state;
            this.starElement();
        });
        return String.html`<div id="star" class="panel-save" onclick="starClick"></div>`;
    }

    rendered() {
        this.starElement();
    }

    starClick() {
        if (!this.saved) {
            localStorage.setItem(this.key, JSON.stringify(this.data));
            this.saved = true;
            publish("item/saved", this.key);
            publish("item/toggle/" + this.data.id, true);
        } else {
            localStorage.removeItem(this.key);
            this.saved = false;
            publish("item/removed", this.key);
            publish("item/toggle/" + this.data.id, false);
        }
        this.starElement();
    }

    private starElement() {
        const e = this.model.star;
        if (this.saved) {
            e.html("&#11088;").attr("title", "remove from saved");
        } else {
            e.html("&#10032;").attr("title", "save");
        }
    };
};