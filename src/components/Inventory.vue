
<template>
    <div class="inventory">
        <h2>Inventory</h2>
        <div class="container">
            <Tile v-for="item in inventoryItems" class="inventory__item">
                <img :src="item.image" :alt="item.key">
                <p>{{ item.key.split('_').join(' ') }}</p>
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
    key: InventoryItems,
    value: number,
    image: any
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
        console.log(inventory.fullInventory);
        inventory.fullInventory.forEach((val, key) => {
            console.log(key)
            items.push({
                key,
                value: val,
                image: require(`@/assets/${key}.png`)
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
            text-decoration: underline;
            font-weight: bold;
            size: 150%;
        }
        .container {
            display: flex;
            flex-direction: row;

            .inventory__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100px;
                margin-right: 10px;

                * {
                    display: block;
                    max-width: 100%;
                    margin-top: 5px;
                }
            }
        }
    }
</style>
