///<reference path="./core.d.ts"/>

/**
 * 
 */
interface ViewManagerRevealArgs {
    /**
    * 
    */
    id?: string, 
    /**
    * 
    */
    view: ViewDefinition, 
    /**
    * 
    */
    params: any, 
    /**
    * 
    */
    uri?: string
}
/**
 * 
 */
declare class ViewManagerClass {
    /**
    * 
    */
    constructor(container: HTMLElement) 
    /**
    * 
    */
    leave(viewId: string): ViewManagerClass
    /**
    * 
    */
    reveal(args: ViewManagerRevealArgs): Promise<string>
}
/**
 * 
 */
interface Route {
    /**
    * 
    */
    id?: string,
    /**
    * 
    */
    name?: string,
    /**
    * 
    */
    view: ViewDefinition,
    /**
    * 
    */
    paramsMap?: (args: string[]) => void,
    /**
    * 
    */
    data?: any
}
/**
 * 
 */
interface RouterNavigateEvent {
    /**
    * 
    */
    router: RouterClass, 
    /**
    * 
    */
    route: Route, 
    /**
    * 
    */
    params: any
}
/**
 * 
 */
interface RouterLeaveEvent {
    /**
    * 
    */
    router: RouterClass, 
    /**
    * 
    */
    route: Route
}
/**
 * 
 */
interface RouterErrorEvent {
    /**
    * 
    */
    router: RouterClass, 
    /**
    * 
    */
    route: Route
}
/**
 * 
 */
interface RouterConstructorArgs {
    /**
     * 
     */
    navigate?: (e: RouterNavigateEvent) => any,
    /**
     * 
     */
    leave?: (e: RouterLeaveEvent) => any,
    /**
     * 
     */
    error?: (e: RouterErrorEvent) => any,
    /**
     * 
     */
    hash?: "#" | "#!",
    /**
     * 
     */
    test?: (route: string) => any,
    /**
     * 
     */
    routes: {[key: string]: Route;}
}
/**
 * Router class to create instance of the router component.
 */
declare class RouterClass {
    constructor(args: RouterConstructorArgs)
    /**
    * 
    */
    useViewManager(manager: ViewManagerClass): RouterClass
    /**
    * 
    */
    start(): RouterClass
    /**
    * 
    */
    getData(): {url: string, id: string, active: boolean, [key: string]: any}
    /**
    * 
    */
    navigate(location: string): RouterClass
    /**
    * 
    */
    reveal(location: string): RouterClass
}

/**
* 
*/
declare module "ihjs/spa" {
    /**
    * 
    */
    export class Router extends RouterClass {}
    /**
    * 
    */
    export class Manager extends ViewManagerClass {}
}

/**
* 
*/
declare module "ihjs/spa/router" {
    /**
    * 
    */
    export default class Router extends RouterClass {}
}

/**
* 
*/
declare module "ihjs/spa/view-manager" {
    /**
    * 
    */
    export default class Manager extends ViewManagerClass {}
}