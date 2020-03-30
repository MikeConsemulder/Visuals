import { IMIDIDevices } from "./midi-device.interface";

export interface IMIDIConnect {
    _audioContext: AudioContext | null;
    _MIDIAccess: any;
    _devices: IMIDIDevices;
}