import { Template } from 'tinacms';

const cardBlock: Template = {
    name: 'card',
    label: 'Infokort samling',
    fields: [
        {
            type: 'object',
            label: 'Infokortlista',
            name: 'cardList',
            list: true,
            ui: {
                itemProps: (item: { staff?: string }) => {
                    // Field values are accessed by item?.<Field name>
                    if (item?.staff) {
                        return {
                            label: item?.staff.substring(item?.staff.lastIndexOf('/') + 1).replace('.md', ''),
                        };
                    }
                    return {};
                },
            },
            fields: [
                {
                    label: 'Bild',
                    name: 'image',
                    type: 'image',
                },
                {
                    label: 'Rubrik',
                    name: 'title_sv',
                    type: 'string',
                },
                {
                    label: 'Rubrik engelska',
                    name: 'title_en',
                    type: 'string',
                },
                {
                    label: 'Text',
                    name: 'text_sv',
                    type: 'rich-text',
                },
                {
                    label: 'Text engelska',
                    name: 'text_en',
                    type: 'rich-text',
                },
            ],
        },
    ],
};

export default cardBlock;
