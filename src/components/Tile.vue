
<template>
    <div class="container">
        <slot>
            Skill Goes Here
        </slot>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
})
export default class Tile extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .container {
        outline: 1px solid black;
        padding: 5px;
        width: 300px;
        height: auto;
        display: flex;
        flex-direction: column;

    }
    .container > * {
        display: block;
        margin: 0 5px;
        outline: 1px solid red;
    }
</style>
