import { MIDIType } from '../enums/midi-type';

export interface IMIDIOutput {
    connection: string;
    id: string;
    manufacturer: string;
    name: string;
    state: string;
    type: MIDIType;
    version: string;
    onstatechange: (event) => any | null;
    send: (dataToSend) => any
}