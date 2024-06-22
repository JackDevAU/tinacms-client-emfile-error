import { Template } from 'tinacms';
const button: Template = {
    label: 'Knapp',
    name: 'button',
    fields: [
        {
            label: 'Text',
            name: 'text',
            type: 'string',
        },
        {
            label: 'Text engelska',
            name: 'text_en',
            type: 'string',
        },
        {
            label: 'Länk',
            name: 'link',
            type: 'string',
        },
    ],
    ui: {
        itemProps: (item: { text?: string }) => ({
            label: `Knapp ${item.text ? `(${item.text})` : ''}`,
        }),
    },
};

export default button;
