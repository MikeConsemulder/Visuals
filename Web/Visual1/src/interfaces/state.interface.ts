import { IMIDIDevices } from "./midi-device.interface";
import { IInputMessage } from "./input-message.interface";

export interface IState {
    devices: IMIDIDevices,
    input_messages: IInputMessage[],
    maxAmountIncommingMessages: number,
    actions: string[],
    actionActivators: any
}