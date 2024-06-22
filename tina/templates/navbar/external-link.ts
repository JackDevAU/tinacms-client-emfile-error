import { Template } from 'tinacms';

const link: Template = {
    name: 'link',
    label: 'Extern länk',
    fields: [
        {
            label: 'Länk',
            name: 'link',
            type: 'string',
            description: 'Länk till extern sida, inkludera http:// eller https://',
        },
        {
            label: 'Länktext',
            name: 'external_link_text',
            type: 'string',
        },
        {
            label: 'Länktext engelska',
            name: 'external_link_text_en',
            type: 'string',
        },
    ],
    ui: {
        itemProps: (item: { external_link_text?: string }) => ({
            label: `${item?.external_link_text ?? 'Extern länk (Tom! Redigera)'} 🔗`,
        }),
    },
};

export default link;
