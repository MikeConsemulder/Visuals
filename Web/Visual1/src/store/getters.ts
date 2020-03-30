import { IState } from "../interfaces/state.interface";
import { IMIDIDevices } from "../interfaces/midi-device.interface";

const getters = {
    InputMIDIDevice: (state: IState) => (id): any => {

        const device = state.devices.inputs.filter(device => {
            return device.id === id;
        });

        if (device.length < 1 || device.length > 1) {

            console.warn('incorrect id');
            return null;
        }

        return device[0];
    },
    devices: (state: IState): IMIDIDevices => state.devices,
    inputMessages: (state: IState) => (id): any => {

        const device = state.input_messages.filter(device => {
            return device.id === id;
        })[0];
        if (device === null || typeof device === 'undefined') return null;
        return device.messages;
    },
    inputIds: (state: IState) => (id): any => {

        const device = state.input_messages.filter(device => {
            return device.id === id;
        })[0];
        if (device === null || typeof device === 'undefined') return null;
        return device.unique_input_ids;
    },
    actions: (state: IState) => state.actions,
    actionActivators: (state: IState) => state.actionActivators,
    isActivator: (state: IState) => ({ action, deviceId, inputId }): boolean => {

        if (!state.actionActivators.hasOwnProperty(deviceId)) return false;
        if (!state.actionActivators[deviceId].hasOwnProperty(inputId)) return false;
        return state.actionActivators[deviceId][inputId].includes(action);
    }
};

export { getters };