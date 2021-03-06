///<reference path="../../../../../../../src/ihjs/dev/types/core.d.ts"/>
///<reference path="../../../../../../../src/ihjs/dev/types/pubsub.d.ts"/>

import {publish, subscribe} from "ihjs/pubsub";

const html = String.html;

export default class implements IView {

    private model: {
        results: HTMLElement,
        total: HTMLElement
    }
    private count: number;
    private route: Route;

    constructor({route}) {
        this.route = route;
        this.count = 0;
        subscribe("item/removed", key => {
            this.model.results.find("#" + key).remove()
            this.model.total.html((--this.count).toString());
        });
        subscribe("item/saved", key => {
            let e = this.model.results.find("#" + key);
            if (e.length) {
                return;
            }
            this.addItem(key);
            this.model.total.html((++this.count).toString());
        });
    }

    render() { 
        return html`
        <h3>
            Your saved items of your <code>GitHub <img src="assets/github.ico" /></code> user search. 
            Total <code id=total></code> items.
        </h3>
        <button onclick="window.history.back();">Go back</button>
        <button onclick="() => this.route.router.navigateToRoute('/')">Return to search</button>
        <div id="results"></div>`;
    }

    rendered() {
        this.model.results.html("");
        for(let key in localStorage) {
            if (key.startsWith("item-")) {
                this.addItem(key);
                this.count++;
            }
        }
        this.model.total.html(this.count.toString());
    }

    private addItem(key: string) {
        let value = JSON.parse(localStorage.getItem(key));
        let element = 
        html`<github-result id=${key} data-do-not-show-score='true' data-remove-on-unstar='true'></github-result>`.dom()
        element.item = value;
        element.details = value;
        this.model.results.append(element);
    };

};