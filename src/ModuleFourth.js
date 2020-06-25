
import { component } from "picoapp";
import BaseModule from "./BaseModule";

console.log('This never gets executed!');

class ModuleFourth extends BaseModule {
  constructor(node, ctx)  {
    super(node, ctx); 
  }
};

export default component((node, ctx) => new ModuleFourth(node, ctx))
