import { Template } from 'tinacms';

const hero: Template = {
    name: 'hero',
    label: 'Hero',
    fields: [
        {
            label: 'Bild',
            name: 'image',
            type: 'image',
        },
        {
            label: 'Titel',
            name: 'title_sv',
            type: 'string',
        },
        {
            label: 'Titel engelska',
            name: 'title_en',
            type: 'string',
        },
        {
            label: 'Underrubrik',
            name: 'subtitle_sv',
            type: 'string',
        },
        {
            label: 'Underrubrik engelska',
            name: 'subtitle_en',
            type: 'string',
        },
    ],
};

export default hero;
