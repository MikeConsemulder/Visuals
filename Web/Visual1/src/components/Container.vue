<template>
    <div>
        container
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import EventBus from "../utils/event-bus";

@Component
export default class Container extends Vue {

    mounted(): void {

        document.addEventListener('action1', (event: any) => {
        
        });

        document.addEventListener('action2', (event: any) => {

        });

        document.addEventListener('action3', (event: any) => {
        });
    }
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';
    
</style>