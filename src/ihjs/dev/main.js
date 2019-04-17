define([
    "$/app",
    "$/models/model",
    "$/view-manager/reveal",

    "$/extensions/HTMLElement/addClass",
    "$/extensions/HTMLElement/attr",
    "$/extensions/HTMLElement/css",
    "$/extensions/HTMLElement/data",
    "$/extensions/HTMLElement/find",
    "$/extensions/HTMLElement/findAll",
    "$/extensions/HTMLElement/forEachChild",
    "$/extensions/HTMLElement/hasClass",
    "$/extensions/HTMLElement/hide",
    "$/extensions/HTMLElement/html",
    "$/extensions/HTMLElement/off",
    "$/extensions/HTMLElement/on",
    "$/extensions/HTMLElement/overflownX",
    "$/extensions/HTMLElement/overflownY",
    "$/extensions/HTMLElement/removeClass",
    "$/extensions/HTMLElement/setFocus",
    "$/extensions/HTMLElement/show",
    "$/extensions/HTMLElement/toggleClass",
    "$/extensions/HTMLElement/trigger",
    "$/extensions/HTMLElement/visible",

    "$extension!Window/on",
    "$extension!Window/off",

    "$/extensions/String/hashCode",
    "$/extensions/String/html",
    "$/extensions/String/toHTML",
    "$/extensions/String/toCamelCase",
    "$/extensions/String/createElement",

    "$/template/parser",
    "$/view-manager/components"

], (_app, Model, {reveal}) => {

    _app.Model = Model;
    _app.import = m => new Promise(resolve => require([m], r => resolve(r)));
    _app.fetch = async (url, opts) => await(await fetch(url, opts)).json();
    _app.render = async (view, elementOrId, params) => 
        await reveal({view: view, elementOrId: elementOrId, params: params});
    
    _app.queryString = (input => {
        let i = input.slice(input.indexOf('?') + 1),
            v = i.match(/[\w\d%\-!.~'()\*]+=[\w\d%\-!.~'()\*]+/g);
        if (!v) {
            return i;
        }
        return v.map(s => s.split('=').map(decodeURIComponent)).reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {});
    })(document.location.search);

    // require if current script tag is last
    _app.config.module && require([_app.config.module], app => (app.default || app)(_app.config.elementId));

});
