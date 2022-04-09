
<template>
    <div class="container">
        {{ label }}
        <div v-if="label">{{ label }}</div>
        <div class="progress-bar">
            <div class="progress-bar__inner" :style="{width: percentage+'%'}"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
      percentage: Number,
      label: String
  }
})
export default class ProgressBar extends Vue {
    percentage!: number;
    label?: string;
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
