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
 * View Manager class is responsible for handling views rendering in leave and reveal methods called by client Router
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

    router: RouterClass
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
 * Router err event parameter
 */
interface RouterErrorEvent {
    /**
    * router that initiated this error
    */
    router: RouterClass, 
    /**
    * router definition where errror occured
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
     * Event is fired when browser navigates to non existing route
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
     * Defines routes object:
     * key is route path starting with slash - e.g "/" or "/view-name"
     * value is Route object {id?: string, name?: string, view: ViewDefinition, paramsMap?: (args: string[]) => void, data?}
     * or simple module path in a string containing view or template
     */
    routes: {[key: string]: any}
}
/**
 * Router class to create instance of the router component.
 */
declare class RouterClass {
    constructor(args: RouterConstructorArgs)
    /**
    * Tells router that it should use following view manager instance, responsible for rendering spa views
    */
    useViewManager(manager: ViewManagerClass): RouterClass
    /**
    * Tell router to render current view (based on url) and start listening to url changes
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
    /**
    * 
    */
    navigateToRoute(name: string): void
}

/**
* ihjs/spa declares all components needed for SPA application - client router and spa view manager
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
