import { Template } from 'tinacms';
import { titleBlock, contentBlock, doubleImage, textImage, doubleText, cardBlock, button, imageBlock } from '../blocks';

const defaultSection: Template = {
    name: 'section',
    label: 'Avsnitt',
    fields: [
        {
            label: 'Namn på avsnitt',
            name: 'name',
            type: 'string',
            required: true,
        },
        {
            label: 'Block',
            name: 'blocks',
            type: 'object',
            list: true,
            ui: {
                visualSelector: true,
            },
            templates: [titleBlock, contentBlock, doubleImage, textImage, doubleText, cardBlock, button, imageBlock],
        },
        {
            label: 'Dekorationer',
            name: 'decorations',
            type: 'string',
            description: 'Välj dekorationer för avsnittet',
            options: [
                { label: 'Inga', value: 'none' },
                { label: 'Vänster', value: 'left' },
                { label: 'Höger', value: 'right' },
                { label: 'Båda', value: 'both' },
            ],
        },
    ],
    ui: {
        itemProps: (item: { name?: string }) => ({
            label: item?.name ?? 'Avsnitt',
        }),
    },
};

export default defaultSection;
