<template>
    <div 
        @click="toggle"
        :class="{'is-Active': isActive}"
        class="Toggle"
    >
        <div 
            :class="{'is-Active': isActive}"
            class="Handle"
        >
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TOggle extends Vue {

    @Prop({default: false}) setActive!: boolean;
    private isActive = false;

    mounted() {
        this.isActive = this.setActive;
    }

    private toggle(): void {

        this.isActive = !this.isActive;
        this.$emit('toggled', this.isActive);
    }  

}
</script>
<style scoped lang="scss">
    .Toggle {

        position: relative;

        width: 4rem;
        height: 2rem;

        border: 1px solid #C4C9CC;

        border-radius: 5rem;
        background-color: #EDF2F4;

        &:hover {

            cursor: pointer;
        }

        &.is-Active {

            background-color: #CCE9D6;
        }

        .Handle {   

            position: absolute;

            top:0;
            right: 50%;

            width: 2rem;
            height: 2rem;

            border-radius: 50%;
            background-color: #929699;
            transition:right 0.1s ease-in;

            &.is-Active {
                
                background-color: #44AF69;
                right: 0;
            }
        }
    }
</style>
