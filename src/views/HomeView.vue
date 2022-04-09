<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Woodcutting />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Woodcutting from "@/components/Woodcutting.vue"; // @ is an alias to /src

@Options({
  components: {
    Woodcutting,
  },
})
export default class HomeView extends Vue {}
</script>
