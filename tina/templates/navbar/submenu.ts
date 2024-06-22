import { Template } from 'tinacms';
import link from './external-link';
import pagelink from './page-link';

const submenu: Template = {
    name: 'submenu',
    label: 'Undermeny',
    fields: [
        {
            label: 'Namn',
            name: 'text',
            type: 'string',
        },
        {
            label: 'Namn engelska',
            name: 'text_en',
            type: 'string',
        },
        {
            label: 'Länkar',
            name: 'items',
            type: 'object',
            list: true,
            templates: [link, pagelink],
        },
    ],
    ui: {
        itemProps: (item) => ({
            label: item.text ? `${item?.text} 📁` : 'Undermeny',
        }),
    },
};

export default submenu;
