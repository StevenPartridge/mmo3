
import { InventoryItems } from '@/store/Inventory';

export enum DialogueAction {
    GO_TO_LINE = 'go_to_line',
    GAIN_ITEM = 'gain_item',
    GIVE_ITEM = 'give_item',
    GAIN_XP = 'gain_xp'
}

export type DialogueOption = {
    text: string,
    action: DialogueAction,
    actionValue?: number | InventoryItems,
    followupAction?: DialogueAction,
    followupActionValue?: number | InventoryItems
};

export type DialogueLine = {
    index?: number,
    speaker: string,
    dialogue: string | string[],
    options: DialogueOption[]
};