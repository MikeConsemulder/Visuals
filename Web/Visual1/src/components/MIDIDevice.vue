<template>
    <div
        :class="{'JustReceivedMessage' : justReceivedMessage}"
        class="MIDIDeviceWrapper"
        :id="id"
    >
        <span class="MIDIDeviceName">
            {{ name }}
        </span>
        <div class="IncommingDataWrapper">
            <InputConfigController 
                :inputs="inputIds"
                :id="id"
            />
            <InputMessageConsole 
                :messages="messages"
                :id="id"
            />
        </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { IMIDIInput } from "../interfaces/midi-input.interface";
import { IMIDIDevices } from "../interfaces/midi-device.interface";
import { IMIDIDataInput } from "../interfaces/midi-data-input.interface";
import InputConfigController from "./InputConfigController.vue";
import InputMessageConsole from "./InputMessageConsole.vue";

@Component({
    components: {
        InputConfigController,
        InputMessageConsole
    }
})
export default class MIDIDevice extends Vue {
    
    private device: IMIDIInput | null = null;
    private deviceInitialized: boolean = false;
    private justReceivedMessage: boolean = false;
    private receivingTimeout: any = null;
    private timeoutInterval: number = 500;

	get id(): string {
		return this.$root.$props.id;
    }

    get name(): string {
		return this.$root.$props.name;
    }
    
    get inputIds(): any {
        return this.$store.getters.inputIds(this.id);
    }

    get messages(): any {
        return this.$store.getters.inputMessages(this.id);
    }

    mounted(): void {

        this.device = this.$store.getters.InputMIDIDevice(this.id);
        this.subscribeToMessages();
    }

    subscribeToMessages(): void { 
        
        this['$MIDIConnect'].subscribeToMessage(this.id, (message: IMIDIDataInput) => {  

            //filter out the noise (probably the MIDIClock tick) TODO: process it into a clock signal
            if(message.id === null || typeof message.id === 'undefined') return;
            
            this.setReceivingTimeout();
            this.$store.dispatch('processMessage', {
                id: this.id,
                message
            });
        })  
    }

    setReceivingTimeout(): void {

        clearTimeout(this.receivingTimeout);
        this.justReceivedMessage = true;
        this.receivingTimeout = null;

        if(this.receivingTimeout === null) {
            this.receivingTimeout = window.setTimeout(() => {
                this.justReceivedMessage = false;
            }, this.timeoutInterval);
        }
    }
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';
    
    .MIDIDeviceWrapper {
        
        box-shadow: 0 4px 8px 0 rgba(63,92,110, 0.13);
        margin: 1rem 0 2rem 0;
        padding-bottom: 1rem;
        box-sizing: border-box;

        .MIDIDeviceName {
            display: block;
            
            padding: 1rem 0.5rem 0.5rem 0.5rem;
            color: $Neutral;
            font-weight: bold;
            box-sizing: border-box;
        }

        &.JustReceivedMessage {
            border: 2px solid $Neutral;
            border-radius: 3px;
        }

        .IncommingDataWrapper {
            margin-top: 1rem;
        }
    }
</style>