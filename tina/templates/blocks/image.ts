import { Template } from 'tinacms';

const contentBlock: Template = {
    name: 'image',
    label: 'Bild',
    fields: [
        {
            type: "image",
            name: "src",
            label: "Bild",
        },
        {
            type: "string",
            name: "alt_sv",
            label: "Beskrivning",
            description: "Detta är en fras på 1-5 ord som beskriver bilden. Är till för skärmläsare och sökmotorer" 
        },
        {
            type: "string",
            name: "alt_en",
            label: "Beskrivning engleska",
            description: "Detta är en fras på 1-5 ord som beskriver bilden. Är till för skärmläsare och sökmotorer" 
        },
    ],
    ui: {
        itemProps: (item) => ({
            label: `Bild (${item?.alt_sv?.lenght > 15 ? item?.alt1_sv?.slice(13) + "..." : item?.alt1_sv})`,
        }),
    },
};

export default contentBlock;
