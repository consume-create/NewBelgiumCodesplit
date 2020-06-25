import { picoapp } from "picoapp";
import './index.scss';
import ModuleFirst from './ModuleFirst'; 

/***
 * 
 * This setup is pretty similar to the one shared by NewBelgium, but it uses picoapp (https://github.com/estrattonbailey/picoapp)
 * as a module resolver and a stateful component generator. 
 * 
 * This index.js file would be the entry point to all pages. 
 * Components that are included by every page can be directly imported, and Webpack will bundle them with this file and the app core. 
 * All modules in the CMS would be registered with the module resolver using the aysncComponentFactory function. This tells Webpack
 * to chunk the module, then dynamically import it with the module resolver on runtime. 
 * 
 * There are multiple ways to include global packages like Jquery or Bootstrap.js. They can be shimmed through Webpack (if included as a node_module),
 * included through a script tag in the html (from a CDN), or dynamically imported within a module (node_module or CDN).
 * An example of the final approach is shown in ModuleThird.js 
 * 
 */


/**
 * 
 * This factory function returns a function that imports a module and creates a component. 
 * This is called by the picoapp module resolver to lazy import / chunk components at runtime.
 * 
 */
const asyncComponentFactory = (handle) => {
	return (node, ctx) => {
		return import(
			/* webpackMode: "lazy" */
			`./${handle}.js`
		).then(module => {
			const instance = module.default(node, ctx)
			const unsubscribe = ctx.on('unmount', () => {
				instance.unmount()
				unsubscribe()
			});
		})
	}
} 

// This creates a registry of all components with picoapp, both statically bundled components and asyncFactory components. 
const components = {
	ModuleFirst, // directly imported and bundled (eg. header + footer)
	ModuleSecond: asyncComponentFactory('ModuleSecond'), // stubbed for on-demand load
	ModuleThird: asyncComponentFactory('ModuleThird'), 
	ModuleFourth: asyncComponentFactory('ModuleFourth'), 
};

// The initial state is used to hydrate the app data store, potentially on a per-page basis.
// Local Storage could be used to persist data across pages.
const initial_state = {
	jquery_loaded: !!(window.$ && window.Jquery),
	components_registered: 0, 
}

// Register the components, hydrate state and create the app.
const app = picoapp(components, initial_state);

// Register an app plugin that parses a data attribute for every component and adds the data to the component ctx
app.use(node => {
  const props = JSON.parse(node.dataset.props || "{}");
  return { props };
});

// Parse the DOM, resolve the modules from the server and mount the components. 
app.mount();


/**
 * This function is called within components to safely add other components based on the global registry
 */
export function addComponent(handle, props) {
	if (!Object.prototype.hasOwnProperty.call(components, handle)) {
		throw new Error(`${handle} has not been registered as a component`);
	}
	const new_component = document.createElement('div');
	new_component.dataset.component = handle; 
	new_component.dataset.props = JSON.stringify(props); 
	return {component: new_component, done: _ => {
		app.mount(); 
	}}
}
