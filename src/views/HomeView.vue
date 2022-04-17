<template>
  <div class="home">
    <Stage :actors="tempActors" :script="script" />
    <Woodcutting />
    <Inventory />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Woodcutting from "@/components/Woodcutting.vue"; // @ is an alias to /src
import Inventory from "@/components/Inventory.vue";
import Stage, { Actor } from "@/components/Stage.vue";
import { DialogueLine } from "@/scripts";
import TutorialScript from '@/scripts/Tutorial'

@Options({
  components: {
    Woodcutting,
    Inventory,
    Stage
  },
})
export default class HomeView extends Vue {
  get tempActors(): Actor[] {
    return [{
      name: 'Steven',
      img: require('@/assets/woodcutting_oak.png')
    }, {
      name: 'Jess',
      img: require('@/assets/woodcutting_wood.png')
    }];
  }

  get script(): DialogueLine[] {
    return TutorialScript;
  }
}
</script>
