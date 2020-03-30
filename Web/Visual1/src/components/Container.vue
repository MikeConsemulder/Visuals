<template>
	<div class="Container">
    	<div id="p5Canvas"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import EventBus from "../utils/event-bus";
import P5 from "p5";

@Component
export default class Container extends Vue {

	private script: any = null;
	private canvas: any;

	private circleCounter: number = 0;
	private radius: number = 0;

	private maxRadius: number = 1000;
	private amountOfDots: number = 100;
	private circleGrowSpeed: number = 0.5;
	private circleCounterSpeed: number = 1;

	private resetReady: boolean = false;

	private messageDate(event: any): any {

		if(typeof event.detail === 'undefined') return null;
		if(typeof event.detail.message === 'undefined') return null;
		return event.detail.message;
	}

	mounted(): void {

		this.attachListeners();
		this.initP5();
	}

	private attachListeners(): void {

		document.addEventListener('maxRadius', (event: any) => {
			
			const max = 1000;
			const data = this.messageDate(event);
			this.maxRadius = this.value(data.value, max);
		});

		document.addEventListener('amountOfDots', (event: any) => {
			const max = 100;
			const data = this.messageDate(event);
			this.amountOfDots = this.value(data.value, max);
		});

		document.addEventListener('circleGrowSpeed', (event: any) => {

			const max = 20;
			const data = this.messageDate(event);
			this.circleGrowSpeed = this.value(data.value, max);
		});

		document.addEventListener('circleCounterSpeed', (event: any) => {

			const max = 150;
			const data = this.messageDate(event);
			this.circleCounterSpeed = this.value(data.value, max);
		});

		document.addEventListener('reset', (event: any) => {
			
			this.resetReady = true;
		});
	}

	private value(value, max) {
		const returnValue = value * (max / 127);
		if(returnValue >= 1) {
			return returnValue;
		}
		return 1;
	}

	private initP5(): void {
		
		new P5((p5) => {   

			p5.setup = _ => this.setup(p5)
			p5.draw = _ => this.draw(p5)
		} )
	}

	private setup(p5) {

		const size = this.canvasSize();
		var canvas = p5.createCanvas(size.width, size.height)
		canvas.parent("p5Canvas");
		p5.background(0);

	}

	private draw(p5) {
		
		const size = this.canvasSize();

		p5.translate(size.width / 2 , size.height / 2);
		
		const angle = p5.TWO_PI/ this.amountOfDots;


		p5.fill(255, 0 , 0);
		const randomsize = p5.random(5,15);
		p5.ellipse(this.radius * p5.sin(angle * this.circleCounter), this.radius  * p5.cos(angle * this.circleCounter), randomsize, randomsize);
	
		this.radius  += this.circleGrowSpeed * p5.random(0.1, 1);
		this.circleCounter += this.circleCounterSpeed * p5.random(1, 1.5);

		if(this.resetReady || this.radius > this.maxRadius){

			this.reset(p5);
		}
	}

	reset(p5): void {

		this.resetReady = false;
		p5.background(0);

		this.radius = 0;
		this.circleCounter = 0;
	}

	private canvasSize(): any {
		
		const canvas = document.getElementById('p5Canvas');
		if(canvas === null) return { width: 0 , height: 0}
		return {
			width: canvas.clientWidth,
			height: canvas.clientHeight 
		}
	}
}
</script>
<style scoped lang="scss">
	@import '../styling/colours.scss';
	
	.Container {

		overflow-y: hidden;

		#p5Canvas {

			width: 100%;
			height: 100vh;

			box-sizing: border-box;

			overflow-y: hidden;
		}
	}
</style>