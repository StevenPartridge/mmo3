
<template>
    <div class="dialogue-container">
        <div class="dialogue-stage">
            <div class="speaker">{{ currentLine.speaker }}</div>
            <div class="dialogue">{{ currentLine.dialogue }}</div>
            <div class="option" v-for="option of currentLine.options">
                <button @click="() => selectOption(option)">
                    {{ option.text }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { DialogueLine, DialogueOption, DialogueAction } from '@/scripts'
import Tile from './Tile.vue';
import { inventory, InventoryItems } from '@/store/Inventory';

export type Speaker = {
    name: string;
    img: any;
}

const followupAction = (option: Omit<DialogueOption, 'text'>): Omit<DialogueOption, 'text'> => {
    return {
        action: option.followupAction as DialogueAction,
        actionValue: option.followupActionValue
    };   
};

@Options({
    props: ['script'],
    components: {
        Tile
    }
})
export default class Stage extends Vue {
    script!: DialogueLine[];
    currentIndex: number = 0;
    
    get currentLine(): DialogueLine {
        return this.script[this.currentIndex];
    }

    selectOption(option: Omit<DialogueOption, 'text'>) {
        switch (option.action) {
            case DialogueAction.GO_TO_LINE:
                this.currentIndex = option.actionValue as number;
                break;
            case DialogueAction.GAIN_ITEM:
                inventory.increseInventory(option.actionValue as InventoryItems);
                this.selectOption(followupAction(option))
            default:
                if (option.followupAction === DialogueAction.GO_TO_LINE) {
                    this.selectOption(followupAction(option))
                }
                break;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .dialogue-container {
        padding-top: 15px;
        width: 300px;
        .dialogue-stage {
            display: flex;
            flex-direction: column;
            text-align: left;

            .speaker {
                font-weight: bold;
                font-size: 125%;
            }

            .option {
                text-align: right;
                margin: 4px;

            button {
                display: inline-block;
                border: none;
                padding: .5rem 1rem;
                margin: 0;
                text-decoration: none;
                background: #07090a;
                color: #d6d6d6;
                font-family: sans-serif;
                font-size: 1rem;
                cursor: pointer;
                text-align: center;
                transition: background 250ms ease-in-out, 
                            transform 150ms ease;
                -webkit-appearance: none;
                -moz-appearance: none;
            }

            button:hover,
            button:focus {
                background: #0053ba;
            }

            button:focus {
                outline: 1px solid #fff;
                outline-offset: -4px;
            }

            button:active {
                transform: scale(0.99);
            }
            }
        }
    }
</style>
