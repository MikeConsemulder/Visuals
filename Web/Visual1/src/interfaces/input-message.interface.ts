import { IMIDIDataInput } from "./midi-data-input.interface";

export interface IInputMessage {
    id: string,
    unique_input_ids: number[],
    messages: IMIDIDataInput[]
}