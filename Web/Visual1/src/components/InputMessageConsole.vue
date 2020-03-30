<template>
    <div 
        v-if="messages !== null"
        class='LogConsole'
    >
        <span class="LastMessage">
            Last input
        </span>
        <div class="MainInformation">
            <MIDIInput :id="message.id"/>
            <span class="InputValue">
                value = {{ message.value }}
            </span>
        </div>
            
        <div class="SubInformation">
            <span>command: {{ message.cmd }}</span>
            <span>Channel: {{ message.channel }}</span>
            <span>Type: {{ message.type }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { IMIDIInput } from "../interfaces/midi-input.interface";
import { IMIDIDataInput } from "../interfaces/midi-data-input.interface";
import MIDIInput from "./MIDIInput.vue";

@Component({
    components: {
        MIDIInput
    }
})
export default class InputMessageConsole extends Vue {

    private autoScroll = true;
    @Prop({ default: [] }) messages!: IMIDIDataInput[];
    @Prop({ default: '' }) id!: string;
    
    @Watch('messages')
    onMessageChange() {
        this.scrollConsole();
    }

    get message(): IMIDIDataInput {
        return this.messages[this.messages.length - 1];
    }

    private setAutoScroll(isActive: any): void {

		this.autoScroll = isActive;
	}
    
	private scrollConsole(): void {

		if(this.autoScroll) {
			this.$el.scrollTop = this.$el.scrollHeight;
		}
	}
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';

    .LogConsole {
 
        padding: 0.5rem 0 0.5rem 0.5rem;
        box-sizing: border-box;
        
        .MainInformation {
            display: flex;

            .InputValue {

                display: block;
                
                margin: 0.5rem;
                padding: 0.5rem;
                
                height: 1rem;

                background-color: $Info;
                color: $Black;
                text-align: center;
                line-height: 1rem;

                border-radius: 3px;
            }
        }

        .SubInformation { 

            margin-left: 0.5rem;
            font-size: 0.8rem;

            span {
                display: block;
            }
        }
    }
</style>