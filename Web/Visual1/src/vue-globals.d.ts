import Vue from "vue";
import { MIDIConnect } from "./domain/MIDIConnect";

declare module "vue/types/vue" {

	interface Vue {
		$MIDIConnect: MIDIConnect;
	}
}