<template>
  <h1>Woodcutting</h1>
  <div>
    <p>Current Level: {{ currentLevel }}</p>
    <p>Skilling since: {{ skillingFor }}</p>
    <button @click="toggleTraining">
      {{ isActive ? "Stop Training" : "Start Training" }}
    </button>
    <ProgressBar :percentage="xpPercentage" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { skill_woodcutting } from "@/store/store-accessor";
import ProgressBar from "./ProgressBar.vue";

@Options({
  props: {

  },
  components: {
    ProgressBar
  }
})
export default class Woodcutting extends Vue {
  skillingForMessage: string = '';
  trainingIntervalId: number | undefined;
  xpPercentage: number = 0;

  get currentLevel(): number {
    return skill_woodcutting.currentLevel;
  }

  get skillingFor(): string {
    return this.skillingForMessage;
  }

  get isActive(): boolean {
    return skill_woodcutting.isActive;
  }

  updateState() {
    if (this.isActive) {
      let newXp = this.xpPercentage + 1;
      if (newXp > 100) {
        skill_woodcutting.increaseLevel();
        newXp = newXp - 100;
      }
      this.xpPercentage = newXp;
      console.log("Hey", this.xpPercentage);
    }
    this.setSkillingForMessage();
  }

  async setSkillingForMessage() {
    this.skillingForMessage = await skill_woodcutting.skillingFor();
  }

  toggleTraining(): void {
    if (this.isActive) {
      skill_woodcutting.stopSkilling();
    } else {
      skill_woodcutting.startSkilling();
    }
  };

  mounted() {
    this.trainingIntervalId = setInterval(this.updateState, 25);
  }

  unmounted() {
    if (this.trainingIntervalId) {
      clearInterval(this.trainingIntervalId);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
