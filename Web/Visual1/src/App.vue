<template>
	<div id="visual">
		<Container/>
		<Drawer/>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EventBus from "./utils/event-bus";
import Drawer from "./components/Drawer.vue";
import Container from "./components/Container.vue";

@Component({
	components: {
		Drawer,
		Container
	}
})
export default class App extends Vue {
	
}
</script>
<style scoped lang="scss">
	
	#visual {

		width: 100%;
		height: 100vh;
	}

</style>