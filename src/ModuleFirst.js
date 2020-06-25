import { component } from "picoapp";
import BaseModule from "./BaseModule";
import './ModuleFirst.scss'

console.log("Module First:imported");

class ModuleFirst extends BaseModule {
  constructor(node, ctx)  {
    super(node, ctx); 
    console.log("Module First:running");

    node.innerHTML = `
    Module First<br>
    Is jquery loaded: <span class="jquery_status">${this._state.jquery_loaded}</span>
    `

    // state changes
    this._ctx.on("jqueryLoaded", state => {
      node.querySelector('.jquery_status').innerHTML = state.jquery_loaded;
    });
  }
};

export default component((node, ctx) => new ModuleFirst(node, ctx))
