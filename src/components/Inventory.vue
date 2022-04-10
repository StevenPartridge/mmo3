
<template>
    <div class="inventory">
        <h2>Inventory</h2>
        <div class="container">
            <Tile v-for="item in inventoryItems" class="inventory__item">
                <img src="@/assets/woodcutting.png" :alt="item.key">
                <p>{{ item.key }}</p>
                <p>{{ item.value}}</p>
            </Tile>
        </div>
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

    .inventory {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        outline: 1px solid black;
        padding: 5px;
        margin-top: 15px;

        h2 {
            margin: 5px 0;
        }
        .container {

            .inventory__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100px;

                * {
                    display: block;
                    max-width: 100%;
                    margin-top: 5px;
                }
            }
        }
    }
</style>
