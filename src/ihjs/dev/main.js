define([
    "ihjs/app",
    "ihjs/models/model",
    "ihjs/view-manager/reveal",

    "ihjs/extensions/HTMLElement/addClass",
    "ihjs/extensions/HTMLElement/appendElement",
    "ihjs/extensions/HTMLElement/appendElementTo",
    "ihjs/extensions/HTMLElement/attr",
    "ihjs/extensions/HTMLElement/css",
    "ihjs/extensions/HTMLElement/dataAttr",
    "ihjs/extensions/HTMLElement/find",
    "ihjs/extensions/HTMLElement/findAll",
    "ihjs/extensions/HTMLElement/forEachChild",
    "ihjs/extensions/HTMLElement/hasClass",
    "ihjs/extensions/HTMLElement/hideElement",
    "ihjs/extensions/HTMLElement/html",
    "ihjs/extensions/HTMLElement/off",
    "ihjs/extensions/HTMLElement/on",
    "ihjs/extensions/HTMLElement/overflownX",
    "ihjs/extensions/HTMLElement/overflownY",
    "ihjs/extensions/HTMLElement/removeClass",
    "ihjs/extensions/HTMLElement/setFocus",
    "ihjs/extensions/HTMLElement/showElement",
    "ihjs/extensions/HTMLElement/toggleClass",
    "ihjs/extensions/HTMLElement/trigger",
    "ihjs/extensions/HTMLElement/visible",

    "extension!NodeList/addClass",
    "extension!NodeList/removeClass",
    "extension!NodeList/toggleClass",
    "extension!NodeList/hasClass",
    "extension!NodeList/showElement",
    "extension!NodeList/hideElement",
    "extension!NodeList/visible",

    "extension!Document/on",
    "extension!Document/off",
    "extension!Document/trigger",
    "extension!Document/find",
    "extension!Document/findAll",

    "extension!Window/on",
    "extension!Window/off",
    "extension!Window/trigger",

    "ihjs/extensions/String/hashCode",
    "ihjs/extensions/String/html",
    "ihjs/extensions/String/toElements",
    "ihjs/extensions/String/toCamelCase",
    "ihjs/extensions/String/createElement",

    "ihjs/template/parser",
    "ihjs/view-manager/components"

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
    _app.config.module && require([_app.config.module], app => {
        app = (app.default || app);
        if (typeof app === "function") {
            app();
        }
    });

});
