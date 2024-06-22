import { Template } from 'tinacms';

const doubleImage: Template = {
    name: 'doubleImage',
    label: 'Bild + bild',
    fields: [
        {
            type: 'image',
            name: 'src1',
            label: 'Bild 1',
        },
        {
            type: 'string',
            name: 'alt1_sv',
            label: 'Beskrivning',
            description: 'Detta är en fras på 1-5 ord som beskriver bilden. Är till för skärmläsare och sökmotorer',
        },
        {
            type: 'string',
            name: 'alt1_en',
            label: 'Beskrivning engleska',
            description: 'Detta är en fras på 1-5 ord som beskriver bilden. Är till för skärmläsare och sökmotorer',
        },
        {
            type: 'image',
            name: 'src2',
            label: 'Bild 2',
        },
        {
            type: 'string',
            name: 'alt2_sv',
            label: 'Beskrivning',
            description: 'Detta är en fras på 1-5 ord som beskriver bilden. Är till för skärmläsare och sökmotorer',
        },
        {
            type: 'string',
            name: 'alt2_en',
            label: 'Beskrivning engleska',
            description: 'Detta är en fras på 1-5 ord som beskriver bilden. Är till för skärmläsare och sökmotorer',
        },
    ],
};

export default doubleImage;
