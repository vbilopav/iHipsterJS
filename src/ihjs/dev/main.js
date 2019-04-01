define([
    "$/app",
    "$/models/model",
    "$/view-manager/reveal",
    "$/extensions/HTMLElement/find",
    "$/extensions/HTMLElement/findAll",
    "$/extensions/HTMLElement/forEachChild",
    "$/extensions/HTMLElement/show",
    "$/extensions/HTMLElement/hide",
    "$/extensions/HTMLElement/on",
    "$/extensions/HTMLElement/html",
    "$/extensions/String/hashCode",
    "$/extensions/String/html",
    "$/extensions/String/toHTML",
    "$extension!Window/on",
    "$extension!Window/off",
    "$/extensions/HTMLElement/addClass",
    "$/extensions/HTMLElement/removeClass",
    "$/extensions/HTMLElement/attr",
    "$/template/parser",
    "$/view-manager/components"

], (_app, Model, {reveal}) => {

    _app.Model = Model;
    _app.import = m => new Promise(resolve => require([m], r => resolve(r)));
    _app.fetch = async (url, opts) => await(await fetch(url, opts)).json();
    _app.render = async (view, elementOrId, params) => 
        await reveal({view: view, elementOrId: elementOrId, params: params});
    require([_app.config.module], app => app(_app.config.elementId));

});
