<template>
    <div class="InputsConfigWrapper">
        <span 
            v-if="inputLength > 0"
            class="Inputs"
        >
            Inputs
        </span>
        <div class="InputConfig">
            <MIDIInput 
                v-for="(input, key) in inputs"
                :key="key"
                :id="input"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IMIDIInput } from "../interfaces/midi-input.interface";
import MIDIInput from "./MIDIInput.vue";

@Component({
    components: {
        MIDIInput
    }
})
export default class ButtonsConfigController extends Vue {

    @Prop({ default: [] }) inputs!: number[];
    @Prop({ default: '' }) id!: string;

    get inputLength(): number {

        if(this.inputs === null) return 0;
        return this.inputs.length;
    }
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';
    
    .InputsConfigWrapper {

        .InputConfig {
            
            display: flex;
            flex-wrap: wrap;
            padding: 0.5rem;
        }

        .Inputs { 

            margin-left: 0.5rem;
            display: block;
            width: 100%;
        }
    }
</style>