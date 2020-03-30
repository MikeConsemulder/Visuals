import Vue from "vue";
import App from "./App.vue";
import { store } from "./store/store";
import vueGlobals from "./utils/vue-globals";

Vue.config.productionTip = false;
Vue.use(vueGlobals);

const app = Vue.extend({
	store,
	render: h => h(App)
});

function renderApplication() {

	const element = document.getElementById('app');
	if (element === null) return;
	new app({
		el: element
	});
}

renderApplication();