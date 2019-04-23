/**
 * 
 */
interface AppObject {
    /**
     * 
     */
    queryString: string | object
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
}
