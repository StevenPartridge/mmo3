
<template>
    <div class="container">
        <Tile v-for="item in inventoryItems">
            <img src="@/assets/woodcutting.png" :alt="item.key">
            <p>{{ item.key }}</p>
            <p>{{ item.value}}</p>
        </Tile>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { inventory, InventoryItems } from '@/store/Inventory';
import Tile from './Tile.vue';

type InventoryItem = {
    key: string,
    value: number
}

@Options({
  props: {
  },
  components: {
    Tile
  }
})
export default class ProgressBar extends Vue {

    get inventoryItems(): InventoryItem[] {
        const items: InventoryItem[] = [];
        inventory.fullInventory.forEach((val, key) => {
            items.push({
                key: InventoryItems[key],
                value: val
            })
        });
        return items;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .container {
        .progress-bar {
            outline: 1px solid black;
            height: 10px;
            width: 100%;
            
            &__inner {
                width: 100%;
                height: 100%;
                background-color: blue;
            }
        }
    }
</style>
