import { MIDIDevicesPlugin } from "./plugins/midi-devices-plugin";

const plugins: any = [
	((store) => {
		new MIDIDevicesPlugin(store).initiate();
	})
];

export { plugins };
