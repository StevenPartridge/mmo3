
<template>
    <div class="container">
        <slot>
            Content Goes Here
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
        border: 1px solid black;
        padding: 5px;
        margin: 5px;
        width: 300px;
        height: auto;
        display: flex;
        flex-direction: column;
    }
</style>
