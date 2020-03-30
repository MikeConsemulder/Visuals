import { MIDIConnect } from "../domain/MIDIConnect";
import EventBus from "./event-bus";

export default {

	async install(Vue) {
		Vue.prototype.$MIDIConnect = new MIDIConnect;
		EventBus.$emit('MIDIConnectReady', Vue.prototype.$MIDIConnect);
	}
};