
import { component } from "picoapp";
import BaseModule from "./BaseModule";
import './ModuleSecond.scss'
import { addComponent } from "./index.js"; 

console.log("Module Second:imported");

class ModuleSecond extends BaseModule {
  constructor(node, ctx)  {
    super(node, ctx); 
    console.log("Module Second:running");

    // set html content (would normally do this in templates)
    node.innerHTML = `
    Module Second <button class="addModule">Click me to add Module Three</button>
    `

    // bindings
    this.handleClick = this.handleClick.bind(this);

    // listeners
    this._node.querySelector('.addModule').addEventListener('click', this.handleClick);

    // unmount calls managed by picoapp
    return this.unmount.bind(this);
  }

  handleClick() {
    const props = {random: Math.round(Math.random() * 5)}
    const add_result = addComponent('ModuleThird', props); 
    if(add_result.component) {
      this._node.parentNode.append(add_result.component);
      add_result.done(); 
    }
  }

  unmount() {
    this._node.removeEventListener('click', this.handleClick); 
  }
};

export default component((node, ctx) => new ModuleSecond(node, ctx))
