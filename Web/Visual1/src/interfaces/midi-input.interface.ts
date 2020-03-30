import { MIDIType } from '../enums/midi-type';

export interface IMIDIInput {
    connection: string;
    id: string;
    manufacturer: string;
    name: string;
    state: string;
    type: MIDIType;
    version: string;
    onstatechange: (event) => any | null;
    onmidimessage: (event) => any | null;
}