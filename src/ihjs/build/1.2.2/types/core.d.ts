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
    model: {[key: string]: string | (() => boolean)} 
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
    element: HTMLElement, 
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
    element?: HTMLElement
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
    oncreate?: (element: HTMLElement) => void
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
    bind(element: HTMLElement, instance?: any, eventContext?: any): any
    /**
    * 
    */
    each(element: HTMLElement, name?: string): void
}
/**
 * 
 */
declare class ModelClass {
    /**
    * 
    */
    constructor(args?: ModelConstructorArgs)
    /**
    * 
    */
    bind(element: HTMLElement, instance?: any, eventContext?: any): ModelInterface
    /**
    * 
    */
    each(element: HTMLElement, name?: string): void
}



/**
* 
*/
declare module "ihjs/models/model" {
    /**
    * 
    */
    export default class Model extends ModelClass {}
}
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
interface AppObject {
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
     * URL query string decoded to object
     */
    queryString: any
    /**
     * 
     */
    relative(from: string, to: string): string
    /**
     * 
     */
    render(view: ViewDefinition, elementOrId: HTMLElement | string, params?: object): Promise<{data: object, element: HTMLElement}>
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
}
/**
 * Set of JQuery-like extensions on HTMLElement prototype.
 */
interface HTMLElement {
    /**
     * 
     */
    addClass(className: string): HTMLElement
    /**
     * 
     */
    appendElement(e: HTMLElement): HTMLElement
    /**
     * 
     */
    appendElementTo(e: HTMLElement): HTMLElement
    /**
     * 
     */
    attr(key: string, value?: string): HTMLElement
    /**
     * 
     */,
    css(property: string, value?: string): HTMLElement
    /**
     * 
     */
    dataAttr(key: string, value?: string): HTMLElement
    /**
     * 
     */
    find(search: string): HTMLElement
    /**
     * 
     */
    findAll(search: string): NodeList
    /**
     * 
     */
    forEachChild(callback: (e: HTMLElement)=>void, callFirst?: boolean): HTMLElement
    /**
     * 
     */
    hasClass(className: string): boolean
    /**
     * 
     */
    hideElement(): HTMLElement
    /**
     * Sets innerHTML value of element or elements and returns same instance.
     */
    html(content?: string): HTMLElement
    /**
     * 
     */
    off(eventName: string, eventHandler: (e: Event)=>void): HTMLElement
    /**
     * 
     */
    on(eventName: string, eventHandler: (e: Event)=>void): HTMLElement
    /**
     * 
     */
    overflownX(): boolean
    /**
     * 
     */
    overflownY(): boolean
    /**
     * 
     */
    removeClass(className: string): HTMLElement
    /**
     * 
     */
    setFocus(): HTMLElement
    /**
     * - If state parameter is not present sets display css attribute to empty (inherit) and returns same instance.
     * - If state parameter not present toggles display css attribute none or empty and returns same instance.
     */
    showElement(state?: boolean): HTMLElement
    /**
     * 
     */
    toggleClass(className: string, state?: boolean): HTMLElement
    /**
     * 
     */
    trigger(eventName: string): HTMLElement
    /**
     * 
     */
    visible(state?: boolean): HTMLElement
}
/**
 * Set of JQuery-like extensions on NodeList prototype.
 */
interface NodeList {
    /**
     * 
     */
    addClass(className: string): NodeList
    /**
     * 
     */
    removeClass(className: string): NodeList
    /**
     * 
     */
    toggleClass(className: string, state?: boolean): NodeList
    /**
     * 
     */
    hasClass(className: string): NodeList
    /**
     * 
     */
    showElement(state?: boolean): NodeList
    /**
     * 
     */
    hideElement(): NodeList
    /**
     * 
     */
    visible(state?: boolean): NodeList
}
/**
 * Set of JQuery-like extensions on NodeList prototype.
 */
interface Document {
    /**
     * 
     */
    on(eventName: string, eventHandler: (e: Event)=>void): Document
    /**
     * 
     */
    off(eventName: string, eventHandler: (e: Event)=>void): Document
    /**
     * 
     */
    trigger(eventName: string): Document
    /**
     * 
     */
    find(search: string): HTMLElement
    /**
     * 
     */
    findAll(search: string): NodeList
}
/**
 * Set of JQuery-like extensions on NodeList prototype.
 */
interface Window {
    /**
     * 
     */
    on(eventName: string, eventHandler: (e: Event)=>void): Window
    /**
     * 
     */
    off(eventName: string, eventHandler: (e: Event)=>void): Window
    /**
     * 
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
     * 
     */
    hashCode(): Number
    /**
     * 
     */
    toHTML(): HTMLElement | NodeList
    /**
     * 
     */
    toCamelCase(): string
    /**
     * 
     */
    createElement(id?: string, content?: string): HTMLElement | NodeList
    /**
     * 
     */
    dom(): HTMLElement | NodeList
}
