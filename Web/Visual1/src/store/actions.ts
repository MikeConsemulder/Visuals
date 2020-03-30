import { IMIDIDevices } from "../interfaces/midi-device.interface";

const actions = {
    addDevices({ commit }, devices: IMIDIDevices): void {
        commit("addDevices", devices);
    },
    processMessage({ commit, state, dispatch }, { id, message }): void {

        const device = state.input_messages.filter(device => {
            return device.id === id;
        })[0];

        dispatch('broadcastMessage', { id, message });

        if (device === null || typeof device === 'undefined') {
            commit('saveNewMessage', { id, message });
            return;
        }

        commit('saveMessage', { id, message });
    },
    setActionActivator({ state, commit, getters }, { action, deviceId, inputId }): void {
        commit('setActionActivator', { action, deviceId, inputId });
    },
    broadcastMessage({ getters }, { id, message }): void {

        getters.actions.forEach((action, actionKey) => {

            if (getters.isActivator({
                action: actionKey,
                deviceId: id,
                inputId: message.id
            })) {
                document.dispatchEvent(new CustomEvent(action, {
                    detail: {
                        message
                    }
                }));
            }
        })
    }
};

export { actions };