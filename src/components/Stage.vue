
<template>
    <div class="container">
        <div class="actors">
            <Tile class="actor">
                <h3>{{ actors[0].name }}</h3>
                <img :src="actors[0].img" :alt="actors[0].name">
            </Tile>
            <Dialogue :script="script" />
            <Tile v-if="actors[1]" class="actor">
                <h3>{{ actors[1].name }}</h3>
                <img :src="actors[1].img" :alt="actors[1].name">
            </Tile>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import Tile from './Tile.vue';
import Dialogue from './Dialogue.vue';
import { DialogueLine } from '@/scripts';

export type Actor = {
    name: string;
    img: any;
}

@Options({
    props: ['actors', 'script'],
    components: {
        Tile,
        Dialogue
    }
})
export default class Stage extends Vue {
actors!: any[];
script!: DialogueLine[]

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .container {
        outline: 1px solid black;
        padding: 5px;
        width: auto;
        height: auto;

        .actors {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: nowrap;

            .actor {
                width: 100px;
                margin: 10px;

                h3 {
                    font-weight: bold;
                    size: 18px;
                }

                img {
                    width: 100%;
                }
            }
        }
    }
</style>
