import { Template } from 'tinacms';

const doubleText: Template = {
    name: 'doubleText',
    label: 'Text + text',
    fields: [
        {
            type: 'rich-text',
            name: 'column1_sv',
            label: 'Kolumn 1',
        },
        {
            type: 'rich-text',
            name: 'column1_en',
            label: 'Kolumn 1 engelska',
        },
        {
            type: 'rich-text',
            name: 'column2_sv',
            label: 'Kolumn 2',
        },
        {
            type: 'rich-text',
            name: 'column2_en',
            label: 'Kolumn 2 engelska',
        },
    ],
};

export default doubleText;
