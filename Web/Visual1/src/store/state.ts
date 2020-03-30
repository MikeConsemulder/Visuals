import { IState } from "../interfaces/state.interface";

const state: IState = {
    devices: {
        inputs: [],
        outputs: []
    },
    input_messages: [],
    maxAmountIncommingMessages: 100,
    actions: [
        'maxRadius', 
        'amountOfDots',
        'circleGrowSpeed',
        'circleCounterSpeed',
        'reset'
    ],
    actionActivators: {}
};

export { state };