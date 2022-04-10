<template>
  <Modal
    v-if="modalIsOpen"
    @close="toggleModal">
    <div class="modal-content">
      <h3>Select Item:</h3>
      <select label="Select Tier" @change="setSelectedTier">
        <option
          v-for="tier of skillDefinition"
          :disabled="tier.level >= currentLevel"
          :value="tier.code">
            {{ tier.label }}
        </option>
      </select>
      <p>{{selectedTier.description}}</p>
    </div>
  </Modal>
  <Tile class="contianer">
    <h2>Woodcutting</h2>
    <button @click="toggleModal">Select Tier</button>
    <ProgressBar :label="xpBarLabel" :percentage="xpPercentage" />
    <img alt="Wood" :src="selectedTier.image" />
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
import { skill_woodcutting, inventory, InventoryItems, SkillTiersWoodcutting } from "@/store/store-accessor";
import ProgressBar from "./ProgressBar.vue";
import Modal, { ModalEvents } from "./Modal.vue";
import Tile from "./Tile.vue";

type TierOption = {
  label: string,
  code: SkillTiersWoodcutting,
  level: number,
  description: string,
  sku: InventoryItems,
  image: any
}

@Options({
  props: {

  },
  components: {
    ProgressBar,
    Tile,
    Modal
  }
})
export default class Woodcutting extends Vue {
  skillingForMessage: string = '';
  trainingIntervalId: number | undefined;
  xpPercentage: number = 0;
  harvestPercentage: number = 0;
  modalOpen: boolean = false;
  tierOptions: Record<SkillTiersWoodcutting, TierOption> = {
    [SkillTiersWoodcutting.WOOD]: {
      label: 'Tier 1 - Wood',
      code: SkillTiersWoodcutting.WOOD,
      level: 0,
      description: "Beginner woocutting activities, collecting twigs and dry moss, try not to get a splinter!",
      sku: InventoryItems.WOOD_WOOD,
      image: require('../assets/woodcutting_wood.png')
    },
    [SkillTiersWoodcutting.OAK]: {
      label: 'Tier 2 - Oak',
      code: SkillTiersWoodcutting.OAK,
      level: 1,
      description: "Things are picking up, you may get a hatchet soon!",
      sku: InventoryItems.WOOD_OAK,
      image: require('../assets/woodcutting_wood.png')
    },
    [SkillTiersWoodcutting.WILLOW]: {
      label: 'Tier 3 - Willow',
      code: SkillTiersWoodcutting.WILLOW,
      level: 20,
      description: "You've tought some trees who's boss, let's keep choppin' an see how far you can go!",
      sku: InventoryItems.WOOD_WILLOW,
      image: require('../assets/woodcutting_wood.png')
    },
    [SkillTiersWoodcutting.EBONY]: {
      label: 'Tier 4 - Ebody',
      code: SkillTiersWoodcutting.EBONY,
      level: 30,
      description: "This strong dense wood is worth a pretty penny, let's get rich!",
      sku: InventoryItems.WOOD_EBONY,
      image: require('../assets/woodcutting_wood.png')
    }
  };
  selectedTier: TierOption = this.tierOptions[SkillTiersWoodcutting.WOOD];
  modalEvents = ModalEvents;


  get skillDefinition(): Record<SkillTiersWoodcutting, TierOption> {
    return this.tierOptions;
  }

  get modalIsOpen(): boolean {
    return this.modalOpen;
  }

  get xpBarLabel(): string {
    return `${this.xpPercentage}%`;
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
    return inventory.fullInventory.get(this.selectedTier.sku) || 0;
  }

  setSelectedTier(tier: Record<string, any>) {
    const newTier = tier.target.value as SkillTiersWoodcutting;
    console.log(newTier);
    this.selectedTier = this.tierOptions[newTier];
  }

  toggleModal() {
    console.log("Opening Modal");
    console.log(this.modalIsOpen);
    this.modalOpen = !this.modalOpen;
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
      inventory.increseInventory(this.selectedTier.sku);
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
      this.harvestPercentage = 0;
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
<style scoped lang="scss">

  .modal-content {
    display: flex;
    padding: 20px;
  }
  .container {
      h2 {
          margin: 5px 0;
          text-decoration: underline;
          font-weight: bold;
          size: 150%;
      }
      * {
          display: block;
          max-width: 100%;
          margin-top: 5px;
      }
  }
</style>
