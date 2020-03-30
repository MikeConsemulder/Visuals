import Vue from "vue";
import { store } from "../../store/store";
import { IMIDIInput } from "../../interfaces/midi-input.interface";
import { IMIDIDataInput } from "../../interfaces/midi-data-input.interface";
import MIDIDevice from "../../components/MIDIDevice.vue";
import EventBus from "../../utils/event-bus";

const midiDevice = Vue.extend({
    props: ["id", "name"],
});

export class MIDIDevicesPlugin {

    private midiInputs!: IMIDIInput[];

    constructor(private store) {

    }

    public initiate(): void {
        
        EventBus.$on('MIDIConnectReady', async(midiConnect) => {

            await midiConnect.initialize();
            this.midiInputs = midiConnect.devices.inputs;
            this.saveDevicesToStore(midiConnect);
            this.createModulePerInput(midiConnect);
        });
    }

    private saveDevicesToStore(midiConnect): void {
        this.store.dispatch('addDevices', midiConnect.devices);
    }

    private createModulePerInput(midiConnect): void {

        const element = document.querySelector('#drawer');
        if (element === null) return;

        midiConnect.devices.inputs.forEach(device => {

            const div = document.createElement("div"); 
            element.appendChild(div); 

            new midiDevice({
                el: div,
                store,
                propsData: {
                    id: device.id,
                    name: device.name
                },
                render: h => h(MIDIDevice)
            })
        });
    }

    private subscribeToInput(): void {

        if (this.midiInputs.length === 0) {

            console.warn('no midi inputs found');
            return;
        };

        const deviceId1 = this.midiInputs[0].id;
        // this.midiConnect.subscribeToMessage(deviceId1, (data: IMIDIDataInput) => {

        //     console.log(data);
        // });
    }
}