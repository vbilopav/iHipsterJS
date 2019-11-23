/**
* Publish/Subscribe global events functions - implementation of pubsub pattern for loose coupled components
*/
declare module "ihjs/pubsub" {
    /**
     * Publishes global application event or events
     * 
     * - Event name usually contains arbitrary categories `name/category/subcategory` followed by list of parameters. Example:
     * ```javascript
     * publish("unique event name / category / subcategory", arg1, arg2, arg3);
     * ```
     * 
     * - Can also publish a list of different events. All events will receive same parameters. Example:
     * ```javascript
     * publish(["event1", "event2", "event3"], arg1, arg2, arg3);
     * ```
     * 
    */
    export function publish(name: string | Array<string>, ...args: any[]): void;
    /**
     * Subscribes to global application event or events.
     * 
     * - Subscribe to single event and receive arguments sent from `publish`:
     * ```javascript
     * subscribe("unique event name", (arg1, arg2, arg3) => { 
     *      console.log("Do something useful on 'unique event name'..."); 
     * });
     * ```
     * 
     * - Can also subscribe to multiple events and receive arguments sent from `publish`(-es):
     * ```javascript
     * subscribe(["event1", "event2", "event3"], (arg1, arg2, arg3) => { 
     *      console.log("Do something useful on those three events ..."); 
     * });
     * ```
     * 
     * - Returns reference that can be sued for `unsubscribe`
     */
    export function subscribe(name: string | Array<string>, handler: (arg: any)=>void): any
    /**
     * Unsubscribes to global application event.
     * Receives event name and event reference received from `subscribe`.
     * Returns `true` if event is successfully unsubscribed. 
     */
    export function unsubscribe(name: string, ref: any): boolean
}
