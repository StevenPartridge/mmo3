<template>
  <div class="home">
    <Woodcutting />
    <Inventory />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Woodcutting from "@/components/Woodcutting.vue"; // @ is an alias to /src
import Inventory from "@/components/Inventory.vue";

@Options({
  components: {
    Woodcutting,
    Inventory
  },
})
export default class HomeView extends Vue {}
</script>
