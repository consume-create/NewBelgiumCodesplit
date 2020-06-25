
export default class BaseModule {
  constructor(node, ctx) {
    this._node = node;
    this._ctx = ctx; 
    this._state = ctx.getState(); 
    node.classList.add('module');
  }

  unmount() {
    // This is the default unmount stub
    // extend this for module unmounting
  }
}



