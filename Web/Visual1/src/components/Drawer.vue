<template>
    <div
        :class="{ 'is-Open' : isOpen }"
        id="drawer"
    >
        <ActionsConfig/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IMIDIInput } from "../interfaces/midi-input.interface";
import ActionsConfig from "./ActionsConfig.vue";

@Component({
    components: {
        ActionsConfig
    }
})
export default class Drawer extends Vue {

    private isOpen: boolean = false;
    
    mounted(): void {

        this.attachInteractions();
    }

    attachInteractions(): void {

        document.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
        })

        document.addEventListener("keydown", (event: KeyboardEvent) => {

            if (event.isComposing || event.keyCode === 192) {
                this.isOpen = !this.isOpen
                return;
            }
        });

        this.preventCloseWhenClickOnDrawer();
    }

    preventCloseWhenClickOnDrawer(): void {

        const drawer = document.getElementById('drawer');
        if(drawer === null) return;
        drawer.addEventListener('click', e => {
            e.stopPropagation();
        });
    }
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';
    #drawer {
        z-index: 10;
        position: fixed;
        
        padding: 2rem;
        
        width: 20rem;
        height: 100vh;
        box-sizing: border-box;

        left: -20rem;
        top: 0;

        background-color: #ffffff;
        color: $Neutral;

        box-shadow: 0 4px 8px 0 rgba(63,92,110, 0.5);

        overflow-y: scroll;       
        transition: left .5s cubic-bezier(0.8, 0.08, 0.4, 0.9);
        
        &.is-Open {
                    
            left: 0; 
        }
    }
</style>