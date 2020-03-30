import { IMIDIInput } from "./midi-input.interface";
import { IMIDIOutput } from "./midi-output-interface";

export interface IMIDIDevices {
    inputs: IMIDIInput[],
    outputs: IMIDIOutput[]
}