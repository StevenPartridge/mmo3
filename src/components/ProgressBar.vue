
<template>
    <div class="container">
        <div class="progress-bar">
            <div class="progress-bar__inner" :style="{width: percentage+'%'}"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
      percentage: Number
  }
})
export default class ProgressBar extends Vue {
    percentage!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .container {
        width: 100px;
        margin: 10px;
        height: 10px;
        .progress-bar {
            outline: 1px solid black;
            height: 100%;
            width: 100%;
            
            &__inner {
                width: 100%;
                height: 100%;
                background-color: blue;
            }
        }
    }
</style>
