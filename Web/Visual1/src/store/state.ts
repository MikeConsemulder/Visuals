import { IState } from "../interfaces/state.interface";

const state: IState = {
    devices: {
        inputs: [],
        outputs: []
    },
    input_messages: [],
    maxAmountIncommingMessages: 100,
    actions: ['action1', 'action2', 'action3'],
    actionActivators: {}
};

export { state };