import { Template } from 'tinacms';

const contentBlock: Template = {
    name: 'content',
    label: 'Innehåll',
    fields: [
        {
            label: 'Etikett',
            name: 'label',
            type: 'string',
        },
        {
            label: 'Innehåll',
            name: 'content',
            type: 'rich-text',
        },
        {
            label: 'Innehåll engelska',
            name: 'content_en',
            type: 'rich-text',
        },
    ],
    ui: {
        itemProps: (item: { label?: string }) => ({
            label: `Innehåll ${item.label ? `(${item.label})` : ''}`,
        }),
    },
};

export default contentBlock;
