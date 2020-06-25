
import { component } from "picoapp";
import BaseModule from "./BaseModule";
import { upperFirst } from "lodash-es";

console.log("Module Third:imported");

class ModuleThird extends BaseModule {
  constructor(node, ctx)  {
    super(node, ctx); 
    console.log("Module Third:running");

    // set html content (would normally do this in templates)
    node.innerHTML = `
      <button class="add_jquery">Click me to load Jquery</button></div>
      This module has a random prop of ${this._ctx.props.random}
      Is jquery loaded: <span class="jquery_status">${this._state.jquery_loaded}</span>
    `;

    // bindings
    this.handleJqueryClick = this.handleClick.bind(this); 

    // selectors
    this._add_jquery = this._node.querySelector('.add_jquery');

    // events
    this._add_jquery.addEventListener('click', this.handleJqueryClick)

    // listeners
    this._ctx.on("jqueryLoaded", state => {
      this._node.querySelector('.jquery_status').innerHTML = state.jquery_loaded;
    });

    // unmount calls managed by picoapp
    return this.unmount.bind(this);
  }

  handleClick() {    
    /**
     * Dynamic import of Jquery - creates a chunk and loads it on demand
     * Checks if defined to prevent duplicate loads. 
     */
    if(!this._state.jquery_loaded) {
      console.log("jquery's not here man"); 
      console.log("importing..."); 

      // Import as a node_module
      // import('jquery').then((jquery) => {
      //   window.$ = jquery.default;
      //   console.log('Jquery imported: ' + $); 
      // });

      // Import from a cdn
      import(/* webpackIgnore: true */'https://code.jquery.com/jquery-3.5.1.min.js').then((jquery) => {
        console.log(window.$); 
        console.log("...imported"); 

        this._ctx.emit("jqueryLoaded", { jquery_loaded: true });
      });
    } else {
      console.log("jquery's already here man"); 
    }
  }

  /**
   * Handle unmount.
   */
  unmount() {
    this._add_jquery.removeEventListener('click', this.handleJqueryClick)
  }
};

export default component((node, ctx) => new ModuleThird(node, ctx))
