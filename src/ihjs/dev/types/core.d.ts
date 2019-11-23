/**
 * 
 */
interface ViewConstructorOptions {
    /**
    * 
    */
    css: Array<string>,
    /**
    * 
    */
    model: {[key: string]: string | ((e: Element) => boolean)} 
}
/**
 * 
 */
interface ViewConstructorArgs {
    /**
    * 
    */
    id: string, 
    /**
    * 
    */
    element: Element, 
    /**
    * 
    */
    options: ViewConstructorOptions
}
/**
 * 
 */
interface ViewMethodArgs {
    /**
    * returned by paramsMap
    */
    params?: any
    /**
    * 
    */
    element?: Element
}
/**
 * `interface` for **`ihjs` view** object that can be either
 * - ### single-page app view
 *      - or - 
 * - ### main view in single-view app
 *      - or 
 * - ### web-component view
 */
interface IView {
    /**
    * To render the view return from this method:
    * - a `string` or `Promise` to return a `string`: 
    * 
    *   - resolves as template bound to instance of a view where this `render` method is defined
    *   - events are bound to view instance and template expressions are not parsed
    * 
    * ---
    * 
    * - function that returns a `string` or `Promise` to return a `string` 
    *       - or -
    * - two element array where first element element function that returns a `string` or `Promise` to return a `string` and second element is any object
    * 
    *   - resolves as self-contained template where template instance (`this` in template) expression is passed as second array parameter (if any)
    *   - events are bound to template `this` instance 
    * 
    */
    render(args?: ViewMethodArgs): string | Promise<string> | (() => string) | [(() => string), any]
    /**
    * 
    */
    rendered?(args?: ViewMethodArgs): void
}
/**
 * 
 */
interface ViewConstructor {
    /**
    * 
    */
    new(args: ViewConstructorArgs): IView
}
/**
 * 
 */
declare var View: ViewConstructor;
/**
 * 
 */
declare type ViewDefinition = string | {
    /**
    * 
    */
    name: string,
    /**
    * 
    */
    inject?: Array<string>,
    /**
    * 
    */
    paramsMap?: (params: Array<string>) => false | any
    /**
    * 
    */
    data?: object
}
/**
 * 
 */
interface ModelConstructorArgs {
    /**
    * 
    */
    model: {[key: string]: string} 
    /**
    * 
    */
    oncreate?: (element: Element) => void
}
/**
 * 
 */
interface ModelInterface {
    /**
    * 
    */
    new (args?: ModelConstructorArgs): any
    /**
    * 
    */
    bind(element: Element, instance?: any, eventContext?: any): any
    /**
    * 
    */
    each(element: Element, name?: string): void
}
/**
 * 
 */
interface ModelInterface {
    /**
    * 
    */
    new (args?: ModelConstructorArgs) : ModelClass
}
/**
 * 
 */
declare class ModelClass {
    /**
    * 
    */
    bind(element: Element, instance?: any, eventContext?: any): ModelInterface
    /**
    * 
    */
    each(element: Element, name?: string): void
}



/**
* 
*/
/*
declare module "ihjs/models/model" {
    export default class Model extends ModelClass {}
}
*/
/**
 * 
 */
interface ParseTemplateArg {
    /**
     * 
     */
    template: string,
    /**
     * 
     */
    data?: object, 
    /**
     * 
     */
    local?: {[key: string]: (...args: any)=>any}, 
    /**
     * 
     */
    name?: string
}
/**
 * defines global constants
 */
declare class AppObject {
    /**
     * 
     */
    appUrl: string
    /**
     * 
     */
    composite: Array<any>
    /**
     * 
     */
    config: {
        module: string,
        /**
         * 
         */
        defaultElementId: string, 
        /**
         * 
         */
        name: string,
        /**
         * 
         */
        loadCssAlways: boolean
    }
    /**
     * 
     */
    dev: boolean
    /**
     * 
     */
    fetch(input: RequestInfo, init?: RequestInit): Promise<any>
    /**
     * creates a promise to import a module: 
     * ```javascript
     * ihjs.import = m => new Promise(resolve => require([m], r => resolve(r)));
     * ```
     */
    import(module: string): Promise<any>
    /**
     * 
     */
    libsUrl: string
    /**
     * 
     */
    parse(template: string, data?: object, local?: {[key: string]: (...args: any)=>any}, name?: string): Promise<string>
    /**
     * URL query string decoded to any an `key: value` object
     * If query string is single value e.g. `?some_value`, it will be a string
     */
    queryString: string | any
    /**
     * Parses URL query string to any an `key: value` object
     * If query string is single value e.g. `?some_value`, it will be a string
     */
    parseQueryString(url: string): string | any
    /**
     * 
     */
    relative(from: string, to: string): string
    /**
     * 
     */
    render(view: ViewDefinition, elementOrId: Element | string, params?: object): Promise<{data: object, element: Element}>
    /**
     * 
     */
    settings: object
    /**
     * 
     */
    sysUrl: string
    /**
     * 
     */
    template: string | Promise<any>
    /**
     * 
     */
    version: string
    /**
     * 
     */
    Model: ModelInterface
}
declare class ElementResult extends Element { length: number }
/**
 * Set of JQuery-like extensions on Element prototype.
 */
interface Element {
    /**
     * - Adds CSS class to instance.
     * - Returns same instance.
     */
    addClass(className: string): Element
    /**
     * - Appends child element to instance.
     * - Returns same instance.
     */
    appendElement(e: Element): Element
    /**
     * - Appends append instance as child element to node.
     * - Returns same instance.
     */
    appendElementTo(e: Element): Element
    /**
     * - If `key` is only parameter, returns value of instance attribute with same key (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets value to instance attribute with same key and returns same instance.
     * - If `toggle` is present, toggles presence of attribute with same key and returns same instance.
     */
    attr(key: string, value?: string , toggle?: boolean): String | Element
    /**
     * - If `property` is only parameter, returns value of instance css property (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets instance css property to that value and returns same instance.
     */
    css(property: string, value?: string): String | Element
    /**
     * - If `key` is only parameter, returns value of instance of data attribute (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets instance css property to that value and returns same instance.
     * - Note: setting value doesn't mutate the DOM, it caches value on element instance.
     */
    dataAttr(key: string, value?: string): any | Element
    /**
     * - Returns all element descendants of node that match selectors (executes `instance.querySelector`).
     * - If no matches found for selector - returns dummy parameter with result length property set to 0 (to avoid unnecessary nestings in code)
     */
    find(search: string): ElementResult;
    /**
     * - Returns all element descendants of node that match selectors (executes `instance.querySelectorAll`).
     */
    findAll(search: string): NodeList
    /**
     * - Iterates recursively trough child elements tree and execute `callback` for each element.
     * - `callFirst` - if true, skips root, default is false
     */
    forEachChild(callback: (e: Element)=>void, callFirst?: boolean): Element
    /**
     * 
     */
    hasClass(className: string): boolean
    /**
     * Sets display to none and returns same instance.
     */
    hideElement(): Element
    /**
     * Sets innerHTML value of element or elements and returns same instance.
     */
    html(content?: string): Element
    /**
     * Removes event listeners from element or elements (calls `removeEventListener`) and returns same instance.
     */
    off(type: string, listener: EventListenerOrEventListenerObject): Element
    /**
     * Adds event listeners to element or elements (calls `addEventListener`) and returns same instance.
     */
    on(type: string, listener: EventListenerOrEventListenerObject): Element
    /**
     * Checks element overflown state horizontally.
     */
    overflownX(): boolean
    /**
     * Checks element overflown state vertically.
     */
    overflownY(): boolean
    /**
     * Removes attribute by key and returns same instance.
     */
    removeAttr(key: string): Element
    /**
     * Removes attribute by key and returns same instance.
     */
    removeClass(className: string): Element
    /**
     * Sets focus to element instance and returns same instance.
     */
    setFocus(): Element
    /**
     * - If state parameter is not present sets display css attribute to empty (inherit) and returns same instance.
     * - If state parameter not present toggles display css attribute none or empty and returns same instance.
     */
    showElement(state?: boolean): Element
    /**
     * Toggles class with className (adds or removes if present) and returns same instance.
     */
    toggleClass(className: string, state?: boolean): Element
    /**
     * Dispatches a synthetic event to target (calls dispatchEvent) and returns same instance.
     */
    trigger(eventName: string): Element
    /**
     * If state is not present, adds visibility: visible attribute, otherwise toggles between visible and hidden and returns same instance.
     */
    visible(state?: boolean): Element
}
/**
 * Set of JQuery-like extensions on NodeList prototype.
 */
interface NodeList {
    /**
     * - Adds CSS class to instance.
     * - Returns same instance.
     */
    addClass(className: string): NodeList
    /**
     * - Appends child element to instance.
     * - Returns same instance.
     */
    appendElement(e: Element): NodeList
    /*
    * - Appends append instance as child element to node.
    * - Returns same instance.
    */
    appendElementTo(e: Element): NodeList
    /**
     * - If `key` is only parameter, returns value of instance attribute with same key (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets value to instance attribute with same key and returns same instance.
     * - If `toggle` is present, toggles presence of attribute with same key and returns same instance.
     */
    attr(key: string, value?: string , toggle?: boolean): String | NodeList
    /*
     * - If `property` is only parameter, returns value of instance css property (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets instance css property to that value and returns same instance.
     */
    css(property: string, value?: string): String | NodeList
    /**
     * - If `key` is only parameter, returns value of instance of data attribute (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets instance css property to that value and returns same instance.
     * - Note: setting value doesn't mutate the DOM, it caches value on element instance.
     */
    dataAttr(key: string, value?: string): any | NodeList
    /**
     * - Iterates recursively trough child elements tree and execute `callback` for each element.
     * - `callFirst` - if true, skips root, default is false
     */
    forEachChild(callback: (e: Element)=>void, callFirst?: boolean): NodeList
    /**
     * Sets innerHTML value of element or elements and returns same instance.
     */
    html(content?: string): NodeList
    /**
     * Removes event listeners from element or elements (calls `removeEventListener`) and returns same instance.
     */
    off(type: string, listener: EventListenerOrEventListenerObject): NodeList
    /**
     * Adds event listeners to element or elements (calls `addEventListener`) and returns same instance.
     */
    on(type: string, listener: EventListenerOrEventListenerObject): Element
    /**
     * Removes attribute by key and returns same instance.
     */
    removeAttr(key: string): NodeList
    /**
     * Removes attribute by key and returns same instance.
     */
    removeClass(className: string): NodeList
    /**
     * - Toggles class with className (adds or removes if present) and returns same instance.
     */
    toggleClass(className: string, state?: boolean): NodeList
    /**
     * - Check if element has class with `className`.
     */
    hasClass(className: string): NodeList
    /**
     * - If state parameter is not present sets display css attribute to empty (inherit) and returns same instance.
     * - If state parameter not present toggles display css attribute none or empty and returns same instance.
     */
    showElement(state?: boolean): NodeList
    /**
     * Sets display to none and returns same instance.
     */
    hideElement(): NodeList
    /**
     * Dispatches a synthetic event to target (calls `dispatchEvent`) and returns same instance.
     */
    trigger(eventName: string): Document
    /**
     * If state is not present, adds visibility: visible attribute, otherwise toggles between visible and hidden and returns same instance.
     */
    visible(state?: boolean): NodeList
}
interface HTMLCollection {
    /**
     * - Adds CSS class to instance.
     * - Returns same instance.
     */
    addClass(className: string): NodeList
    /**
     * - Appends child element to instance.
     * - Returns same instance.
     */
    appendElement(e: Element): NodeList
    /*
    * - Appends append instance as child element to node.
    * - Returns same instance.
    */
    appendElementTo(e: Element): NodeList
    /**
     * - If `key` is only parameter, returns value of instance attribute with same key (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets value to instance attribute with same key and returns same instance.
     * - If `toggle` is present, toggles presence of attribute with same key and returns same instance.
     */
    attr(key: string, value?: string , toggle?: boolean): String | NodeList
    /*
     * - If `property` is only parameter, returns value of instance css property (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets instance css property to that value and returns same instance.
     */
    css(property: string, value?: string): String | NodeList
    /**
     * - If `key` is only parameter, returns value of instance of data attribute (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets instance css property to that value and returns same instance.
     * - Note: setting value doesn't mutate the DOM, it caches value on element instance.
     */
    dataAttr(key: string, value?: string): any | NodeList
    /**
     * - Iterates recursively trough child elements tree and execute `callback` for each element.
     * - `callFirst` - if true, skips root, default is false
     */
    forEachChild(callback: (e: Element)=>void, callFirst?: boolean): NodeList
    /**
     * Sets innerHTML value of element or elements and returns same instance.
     */
    html(content?: string): NodeList
    /**
     * Removes event listeners from element or elements (calls `removeEventListener`) and returns same instance.
     */
    off(type: string, listener: EventListenerOrEventListenerObject): NodeList
    /**
     * Adds event listeners to element or elements (calls `addEventListener`) and returns same instance.
     */
    on(type: string, listener: EventListenerOrEventListenerObject): Element
    /**
     * Removes attribute by key and returns same instance.
     */
    removeAttr(key: string): NodeList
    /**
     * Removes attribute by key and returns same instance.
     */
    removeClass(className: string): NodeList
    /**
     * - Toggles class with className (adds or removes if present) and returns same instance.
     */
    toggleClass(className: string, state?: boolean): NodeList
    /**
     * - Check if element has class with `className`.
     */
    hasClass(className: string): NodeList
    /**
     * - If state parameter is not present sets display css attribute to empty (inherit) and returns same instance.
     * - If state parameter not present toggles display css attribute none or empty and returns same instance.
     */
    showElement(state?: boolean): NodeList
    /**
     * Sets display to none and returns same instance.
     */
    hideElement(): NodeList
    /**
     * Dispatches a synthetic event to target (calls `dispatchEvent`) and returns same instance.
     */
    trigger(eventName: string): Document
    /**
     * If state is not present, adds visibility: visible attribute, otherwise toggles between visible and hidden and returns same instance.
     */
    visible(state?: boolean): NodeList
}
/**
 * Set of JQuery-like extensions on NodeList prototype.
 */
interface Document {
    /**
     * Adds event listeners to element or elements (calls `addEventListener`) and returns same instance.
     */
    on(type: string, listener: EventListenerOrEventListenerObject): Document
    /**
     * Removes event listeners from element or elements (calls `removeEventListener`) and returns same instance.
     */
    off(type: string, listener: EventListenerOrEventListenerObject): Document
    /**
     * Dispatches a synthetic event to target (calls `dispatchEvent`) and returns same instance.
     */
    trigger(eventName: string): Document
    /**
     * - Returns all element descendants of node that match selectors (executes `instance.querySelector`).
     * - If no matches found for selector - returns dummy parameter with result length property set to 0 (to avoid unnecessary nestings in code)
     */
    find(search: string): ElementResult
    /**
     * - Returns all element descendants of node that match selectors (executes `instance.querySelectorAll`).
     */
    findAll(search: string): NodeList
}
/**
 * Set of JQuery-like extensions on NodeList prototype.
 */
interface Window {
    /**
     * Adds event listeners to element or elements (calls `addEventListener`) and returns same instance.
     */
    on(type: string, listener: EventListenerOrEventListenerObject): Window
    /**
     * 
     */
    off(eventName: string, eventHandler: (e: Event)=>void): Window
    /**
     * Dispatches a synthetic event to target (calls dispatchEvent) and returns same instance.
     */
    trigger(eventName: string): Window
    /**
     * Global application object
     */
    ihjs: AppObject
}
/**
 * 
 */
interface StringConstructor {
    /**
     * Support for Visual Studio Code [`lit-html` extension](https://github.com/Polymer/lit-html)
     * 
     * *Syntax highlighting and IntelliSense for html inside of JavaScript and TypeScript tagged template strings.*
     * 
     * ---
     * 
     * Example: `String.html``<div>some html</div>``
     * 
     * Returns unchanged string value.
     */
    html: any
}
/**
 * 
 */
interface String {
    /**
     * Returns hash code of string instance
     */
    hashCode(): Number
    /**
     * Converts kebab name in a string to camel cased name
     */
    toCamelCase(): string
    /**
     * Creates element from tag name in a String and adds id and content if those params are present.
     */
    createElement(id?: string, content?: string): Element
    /**
     * Builds Element from HTML markup in a string
     */
    dom(): Element
}
/**
 * List of various HTML element created by model containing element from model declared with same name or id
 */
interface HTMLModelArray extends Array<Element> {
    /**
     * - Adds CSS class to instance.
     * - Returns same instance.
     */
    addClass(className: string): HTMLModelArray
    /**
     * - Appends child element to instance.
     * - Returns same instance.
     */
    appendElement(e: Element): HTMLModelArray
    /**
     * - Appends append instance as child element to node.
     * - Returns same instance.
     */
    appendElementTo(e: Element): HTMLModelArray
    /**
     * - If `key` is only parameter, returns value of instance attribute with same key (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets value to instance attribute with same key and returns same instance.
     * - If `toggle` is present, toggles presence of attribute with same key and returns same instance.
     */
    attr(key: string, value?: string , toggle?: boolean): String | HTMLModelArray
    /**
     * - If `property` is only parameter, returns value of instance css property (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets instance css property to that value and returns same instance.
     */
    css(property: string, value?: string): String | HTMLModelArray
    /**
     * - If `key` is only parameter, returns value of instance of data attribute (does not apply to `NodeList` and `HTMLModelArray`).
     * - If `value` is present, sets instance css property to that value and returns same instance.
     * - Note: setting value doesn't mutate the DOM, it caches value on element instance.
     */
    dataAttr(key: string, value?: string): any | HTMLModelArray
    /**
     * - Iterates recursively trough child elements tree and execute `callback` for each element.
     * - `callFirst` - if true, skips root, default is false
     */
    forEachChild(callback: (e: Element)=>void, callFirst?: boolean): HTMLModelArray
    /**
     * Sets display to none and returns same instance.
     */
    hideElement(): HTMLModelArray
    /**
     * Sets innerHTML value of element or elements and returns same instance.
     */
    html(content?: string): HTMLModelArray
    /**
     * Removes event listeners from element or elements (calls `removeEventListener`) and returns same instance.
     */
    off(type: string, listener: EventListenerOrEventListenerObject): HTMLModelArray
    /**
     * Adds event listeners to element or elements (calls `addEventListener`) and returns same instance.
     */
    on(type: string, listener: EventListenerOrEventListenerObject): HTMLModelArray
    /**
     * Removes attribute by key and returns same instance.
     */
    removeAttr(key: string): HTMLModelArray
    /**
     * Removes attribute by key and returns same instance.
     */
    removeClass(className: string): HTMLModelArray
    /**
     * - If state parameter is not present sets display css attribute to empty (inherit) and returns same instance.
     * - If state parameter not present toggles display css attribute none or empty and returns same instance.
     */
    showElement(state?: boolean): HTMLModelArray
    /**
     * Toggles class with className (adds or removes if present) and returns same instance.
     */
    toggleClass(className: string, state?: boolean): HTMLModelArray
    /**
     * Dispatches a synthetic event to target (calls dispatchEvent) and returns same instance.
     */
    trigger(eventName: string): HTMLModelArray
    /**
     * If state is not present, adds visibility: visible attribute, otherwise toggles between visible and hidden and returns same instance.
     */
    visible(state?: boolean): HTMLModelArray
}
