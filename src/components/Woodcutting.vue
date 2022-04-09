<template>
  <Tile>
    <h1>Woodcutting</h1>
    <ProgressBar :label="xpBarLabel" :percentage="xpPercentage" />
    <img alt="Wood" src="../assets/woodcutting.png" />
    <p>Current Level: {{ currentLevel }}</p>
    <p>Current Inventory: {{ woodCount }}</p>
    <p>Skilling since: {{ skillingFor }}</p>
    <button @click="toggleTraining">
      {{ isActive ? "Stop Training" : "Start Training" }}
    </button>
    <ProgressBar :percentage="harvestPercentage" />
  </Tile>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { skill_woodcutting, inventory, InventoryItems } from "@/store/store-accessor";
import ProgressBar from "./ProgressBar.vue";
import Tile from "./Tile.vue";
@Options({
  props: {

  },
  components: {
    ProgressBar,
    Tile
  }
})
export default class Woodcutting extends Vue {
  skillingForMessage: string = '';
  trainingIntervalId: number | undefined;
  xpPercentage: number = 0;
  harvestPercentage: number = 0;

  get xpBarLabel(): string {
    return `${this.xpPercentage}%`
  }

  get currentLevel(): number {
    return skill_woodcutting.currentLevel;
  }

  get skillingFor(): string {
    return this.skillingForMessage;
  }

  get isActive(): boolean {
    return skill_woodcutting.isActive;
  }

  get woodCount(): number {
    return inventory.fullInventory.get(InventoryItems.Wood) || 0;
  }

  increaseXp() {
      let newXp = this.xpPercentage + 10;
      if (newXp >= 100) {
        skill_woodcutting.increaseLevel();
        newXp = newXp - 100;
      }
      this.xpPercentage = newXp;
  }

  increaseHarvest() {
    let newHarvestPercentage = this.harvestPercentage + 1;
    if (newHarvestPercentage >= 100) {
      inventory.increseInventory(InventoryItems.Wood);
      this.increaseXp();
      newHarvestPercentage = newHarvestPercentage - 100;
    }
    this.harvestPercentage = newHarvestPercentage;
  }

  updateState() {
    if (this.isActive) {
      this.increaseHarvest();
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
