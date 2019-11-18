///<reference path="./core.d.ts"/>
/**
 * 
 */
interface DefineComponentArg {
    /**
    * Name for the new custom element in accordance to web standard (must contain a hyphen).
    */
    tag: string
    /**
    * Path to source of module view file or template file
    */
    src: string
    /**
    * Array containing the names of the attributes you want to observe.
    * Observed attributes trigger events on change (`attributeChangedCallback` and camel cased set event containing attribute name e.g `setId`)
    */
    observedAttributes?: Array<any>
    /**
    * Shared context object.
    */
    context?: any
}
/**
* 
*/
declare module "ihjs/components" {
    /**
    * Defines one or more enhanced custom elements by calling `window.customElements.define`.
    * Custom element is defined in module or template defined by path in src field of argument.
    * 
    * Enhanced custom elements can:
    * - be loaded from external module ore template (see `src` attribute on argument)
    * - have module support and rendered event
    * - extra events for setting observed attributes in camel case (e.g. `setId` for id, `setHref` fro href, etc)
    * - receive extra shared context object
    */
    export function customElementsDefine(...args: Array<DefineComponentArg>);
}
