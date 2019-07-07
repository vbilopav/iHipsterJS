[![npm version](https://badge.fury.io/js/ihjs.svg)](https://badge.fury.io/js/ihjs)


### `addClass(className: string): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- Adds CSS class to instance.
- Returns same instance.


### `appendElement(newChild: any): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- Appends child element to instance
- Returns same instance.


### `appendElementTo(node: HTMLElement): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- Appends append instance as child element to node.
- Returns same instance.


### `attr(key: string, value?: string , toggle?: boolean): String | HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- If `key` is only parameter, returns value of instance attribute with same key (does not apply to `NodeList` and `HTMLModelArray`).
- If `value` is present, sets value to instance attribute with same key and returns same instance.
- If `toggle` is present, toggles presence of attribute with same key and returns same instance.


### `css(property: string, value?: string): String | HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- If `property` is only parameter, returns value of instance css property (does not apply to `NodeList` and `HTMLModelArray`).
- If `value` is present, sets instance css property to that value and returns same instance.


### `dataAttr(key: string, value?: string): Any | HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- If `key` is only parameter, returns value of instance of data attribute (does not apply to `NodeList` and `HTMLModelArray`).
- If `value` is present, sets instance css property to that value and returns same instance.
- Note: setting value doesn't mutate the DOM, it caches value on element instance.


### `find(selectors: string): HTMLElement | NodeList`
- Applies to: `HTMLElement` and `Document` only.
- Returns all element descendants of node that match selectors (executes instance.querySelector).
- If no matches found for selector - returns dummy parameter with result length property set to 0 (to avoid unnecessary nestings in code).


### `findAll(selectors: string): NodeList`
- Applies to: `HTMLElement` and `Document` only.
- Returns all element descendants of node that match selectors (executes instance.querySelectorAll).


### `forEachChild(callback: (e?: HTMLElement)=>void=()=>{}, callFirst: boolean=false): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- Iterates recursively trough child elements tree and execute `callback` for each element.
- `callFirst` - if true, skips root, default is false.


### `hasClass(className: string): true|false`
- Applies to: `HTMLElement`.
- Check if element has class with className.


### `hideElement(): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- Sets display to none and returns same instance.


### `html(content?: String): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- Sets innerHTML value of element or elements and returns same instance.


### `off(type: string, listener: EventListenerOrEventListenerObject): HTMLElement | NodeList | HTMLModelArray | Document | Window`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`, `Document`, `Window`.
- Removes event listeners from element or elements (calls removeEventListener) and returns same instance.


### `on(type: string, listener: EventListenerOrEventListenerObject): HTMLElement | NodeList | HTMLModelArray | Document | Window`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`, `Document`, `Window`.
- Adds event listeners to element or elements (calls addEventListener) and returns same instance.


### `overflownX(): boolean`
- Applies to: `HTMLElement`
- Checks element overflown state horizontally.


### `overflownY(): boolean`
- Applies to: `HTMLElement`
- Checks element overflown state vertically.


### `removeAttr(key: String): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- Removes attribute by key and returns same instance.


### `removeClass(className: String): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- Removes attribute by key and returns same instance.


### `setFocus(): HTMLElement`
- Applies to: `HTMLElement
- Sets focus to element instance and returns same instance.


### `showElement(state? Boolean): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- If state parameter is not present sets display css attribute to empty (inherit) and returns same instance.
- If state parameter not present toggles display css attribute none or empty and returns same instance.


### `toggleClass(className?: String) : HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- Toggles class with className (adds or removes if present) and returns same instance.


### `trigger(eventName: String): HTMLElement | NodeList | HTMLModelArray | Document | Window`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`, `Document`, `Window`.
- Dispatches a synthetic event to target (calls dispatchEvent) and returns same instance.


### `visible(state?: Boolean): HTMLElement | NodeList | HTMLModelArray`
- Applies to: `HTMLElement`, `NodeList`, `HTMLModelArray`.
- If satte is not present, adds visibility: visible attribute, otherwise toggles between visible and hidden and returns same instance.


# String extensions:

### hashCode(): Number
- Returns hash code of string instance

### static html(): String
- Gives lit-html support for Visual Studio Code lit-html extension
- Following string in JavaScript:
  ```JavaScript 
  String.html`<div>some html</div>`
  ```
    will have proper HTML language support with syntax highlight


### dom(): HTMLElement
- Builds HTMLElement from HTML markup in a string

### toCamelCase(): String
- Converts kebab name in a string to camel cased name

### createElement(id?: String, content?: String): String
- Creates element from tag name in a String and adds id and content if those params are present.

