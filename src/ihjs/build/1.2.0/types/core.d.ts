/**
 * 
 */
interface ViewConstructorOptions {
    /**
    * 
    */
    disableCaching: boolean,
    /**
    * 
    */
    callRenderOnlyOnce: boolean,
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
    params?: any
    /**
    * 
    */
    element?: HTMLElement
}
/**
 * 
 */
interface View {
    /**
    * 
    */
    render(args?: ViewMethodArgs): string | Promise<string>
    /**
    * 
    */
    rendered?(args?: ViewMethodArgs): void
    /**
    * 
    */
    changed?(args?: ViewMethodArgs): void
}
/**
 * 
 */
interface ViewConstructor {
    /**
    * 
    */
    new(args: ViewConstructorArgs): View
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
interface DefineComponentArg {
    /**
    * 
    */
    tag: string
    /**
    * 
    */
    src: string
    /**
    * 
    */
    observedAttributes?: Array<any>
    /**
    * 
    */
    context?: any
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
 * 
 */
interface AppObject {
    /**
     * 
     */
    Model: ModelInterface
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
        /**
         * 
         */
        module?: string, 
        /**
         * 
         */
        view?: string, 
        /**
         * 
         */
        elementId: string, 
        /**
         * 
         */
        name: string
    }
    /**
     * 
     */
    customElements: {
        /**
         * 
         */
        define(...components: [DefineComponentArg]): void
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
     * 
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
     * 
     */
    queryString: string | object
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
     * 
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
     * 
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
     * 
     */
    _app: AppObject
}
/**
 * 
 */
interface StringConstructor {
    /**
     * 
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
