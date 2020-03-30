import { MIDIType } from '../enums/midi-type';
import { IMIDIDevices } from '../interfaces/midi-device.interface';
import { IMIDIConnect } from '../interfaces/midi-connect.interface';
import { IMIDIDataInput } from '../interfaces/midi-data-input.interface';

export class MIDIConnect implements IMIDIConnect {

    _audioContext!: AudioContext | null;
    _MIDIAccess!: any;
    _devices: IMIDIDevices;

    constructor() {

        this._devices = {
            inputs: [],
            outputs: []
        }
        this._audioContext = this.getAudioContext();
    }

    public get devices(): IMIDIDevices {
        return this._devices;
    }

    public async initialize(): Promise<void> {

        if (this._audioContext === null) return;
        this._MIDIAccess = await this.getMIDIAccess();
        if (this._MIDIAccess === null) return;
        await this.getMIDIDevices();
    }

    public subscribeToMessage(id: string, callback: (data: IMIDIDataInput) => any): boolean {

        const inputDevice: any = this.getDeviceById(id, MIDIType.INPUT);
        if (!inputDevice) return false;

        inputDevice.onmidimessage = (event) => {

            const data = {
                cmd: event.data[0] >> 4,
                channel: event.data[0] & 0xf,
                type: event.data[0] & 0xf0,
                id: event.data[1],
                value: event.data[2] //velocity, potentiometer value etc.
            }

            callback(data);
        }

        return true;
    }

    public sendMessage(id: string, messageToSend: number[]): void {

        const outputDevice: any = this.getDeviceById(id, MIDIType.OUTPUT);
        if (!outputDevice) return;

        outputDevice.send(messageToSend);
    }

    private getDeviceById(id, type): any {

        if (type !== MIDIType.INPUT && type !== MIDIType.OUTPUT) {
            console.warn('invalid MIDI type');
            return false;
        }

        const device = this.devices[`${type}s`].filter(device => {
            return device.id === id;
        })

        if (device.length < 1) {
            console.warn('incorrect id passed');
            return false;
        }

        if (device.length > 1) {
            console.warn('duplicate id passed');
            return false;
        }

        return device[0];
    }

    private getAudioContext(): AudioContext | null {

        try {
            AudioContext = window.AudioContext || window.webkitAudioContext; // for ios/safari
            return new AudioContext();
        }
        catch (e) {

            console.warn('MIDI connection is not supported in this browser');
            return null;
        }
    }

    private async getMIDIAccess(): Promise<any> {

        if (!navigator.requestMIDIAccess) {

            console.warn('MIDI connection is not supported in this browser');
            return null;
        };

        return await navigator.requestMIDIAccess({ sysex: false });
    }

    private async getMIDIDevices(): Promise<void> {

        const inputs = await this._MIDIAccess.inputs.values();
        const outputs = await this._MIDIAccess.outputs.values();

        for (let MIDIDevice of inputs) {
            this._devices.inputs.push(MIDIDevice);
        }

        for (let MIDIDevice of outputs) {
            this._devices.outputs.push(MIDIDevice);
        }
    }
}