import { InventoryItems } from "@/store/Inventory";
import { DialogueLine, DialogueAction } from ".";



const tutorialScript: DialogueLine[] = [
    {
        index: 0,
        speaker: 'Steven',
        dialogue: 'Hey there, sexy!',
        options: [
            {
                text: 'Oh Hay! :D',
                action: DialogueAction.GO_TO_LINE,
                actionValue: 1
            },
            {
                text: 'Tee Hee ;p',
                action: DialogueAction.GO_TO_LINE,
                actionValue: 1
            },
            {
                text: 'Can I have some free XP?',
                action: DialogueAction.GAIN_XP,
                actionValue: 42069,
                followupAction: DialogueAction.GO_TO_LINE,
                followupActionValue: 2
            }
        ]
    },
    {
        index: 1,
        speaker: 'Steven',
        dialogue: 'So what brings you here?',
        options: [
            {
                text: 'Looking for loot!',
                action: DialogueAction.GO_TO_LINE,
                actionValue: 3
            },
            {
                text: "I'm trying out your new dialogue system, silly!",
                action: DialogueAction.GO_TO_LINE,
                actionValue: 4
            }
        ]
    },
    {
        index: 2,
        speaker: 'Steven',
        dialogue: 'There, 42069 xp all for you ;)',
        options: [
            {
                text: 'Gee, thanks!',
                action: DialogueAction.GO_TO_LINE,
                actionValue: 5
            }
        ]
    },
    {
        index: 3,
        speaker: 'Steven',
        dialogue: 'Well okay then, here you go!',
        options: [
            {
                text: 'Accept Gift',
                action: DialogueAction.GAIN_ITEM,
                actionValue: InventoryItems.ETC_HEART,
                followupAction: DialogueAction.GO_TO_LINE,
                followupActionValue: 5
            }
        ]
    },
    {
        index: 4,
        speaker: 'Steven',
        dialogue: "Well, thank you. I'm very glad I can count on you for this, I really appreciate your feedback",
        options: [
            {
                text: 'Hell ya, brother!',
                action: DialogueAction.GO_TO_LINE,
                actionValue: 5
            }
        ]
    },
    {
        index: 5,
        speaker: 'Steven',
        dialogue: "That's all I have for now, start over?",
        options: [
            {
                text: 'Start over',
                action: DialogueAction.GO_TO_LINE,
                actionValue: 0
            },
            {
                text: 'NO fuck you!',
                action: DialogueAction.GO_TO_LINE,
                actionValue: 6
            }
        ]
    },
    {
        index: 6,
        speaker: 'Steven (Admin)',
        dialogue: "Too fuckin bad, back to the beginning!",
        options: [
            {
                text: "<Get Wrecked>",
                action: DialogueAction.GO_TO_LINE,
                actionValue: 0
            }
        ]
    }
];

export default tutorialScript;