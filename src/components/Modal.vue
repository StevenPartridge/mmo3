
<template>
    <div class="container">
        <div class="content">
            <span class="close" @click="emitClose">X</span>
            <slot>
                Content Goes Here
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

export enum ModalEvents {
    CLOSE = 'close'
}

@Options({
    emits: [ModalEvents.CLOSE]
})
export default class Modal extends Vue {
    emitClose() {
        this.$emit(ModalEvents.CLOSE);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* The Modal (background) */
.container {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

  .content {
      position: relative;
    .close {
      position:absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      rotate: 45deg;
      outline: 1px solid black;
      border-radius: 100%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 60%; /* Could be more or less, depending on screen size */
  }
}

</style>
