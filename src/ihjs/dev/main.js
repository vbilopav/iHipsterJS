define([
    "sys/app",
    "sys/models/model",
    "sys/view-manager/reveal",
    "sys/extensions/HTMLElement/find",
    "sys/extensions/HTMLElement/findAll",
    "sys/extensions/HTMLElement/forEachChild",
    "sys/extensions/HTMLElement/show",
    "sys/extensions/HTMLElement/hide",
    "sys/extensions/HTMLElement/on",
    "sys/extensions/HTMLElement/html",
    "sys/extensions/String/hashCode",
    "sys/extensions/String/html",
    "sys/extensions/String/toHTML",
    "extension!Window/on",
    "extension!Window/off",
    "sys/extensions/HTMLElement/addClass",
    "sys/extensions/HTMLElement/removeClass",
    "sys/extensions/HTMLElement/attr",
    "sys/template/parser",
    "sys/view-manager/components"

], (_app, Model, {reveal}) => {

    _app.Model = Model;
    _app.import = m => new Promise(resolve => require([m], r => resolve(r)));
    _app.fetch = async (url, opts) => await(await fetch(url, opts)).json();
    _app.render = async (view, elementOrId, params) => 
        await reveal({view: view, elementOrId: elementOrId, params: params});
    require([_app.config.module], app => app(_app.config.elementId));

});
