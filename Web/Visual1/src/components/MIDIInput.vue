<template>
    <Draggable 
        class="MIDIInput"
        :data-device-id="deviceId"
        :data-id="id"
    >
        {{ id }}
    </Draggable>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IMIDIInput } from "../interfaces/midi-input.interface";
import EventBus from "../utils/event-bus";
import Draggable from "./Draggable.vue";

@Component({
    components: {
        Draggable
    }
})
export default class MIDIInput extends Vue {

    @Prop({ default: null }) id!: number | null;

    get deviceId(): string {

        const name = 'MIDIDevice';
        let component: any = null
        let parent: any = this.$parent;
        while (parent && !component) {
            if (parent.$options.name === name) {
                component = parent
            }
            parent = parent.$parent
        }
        return component.id;
    }
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';

    .MIDIInput{

        background-color: $Neutral;
        color: $Grey;
        text-align: center;
        line-height: 1rem;
        width: 1rem;
        height: 1rem;
        padding: 0.5rem;
        margin: 0.5rem;
        border-radius: 3px;   

        &:hover {
            cursor: pointer;
        }
    }
</style>