import { Collection } from 'tinacms';
import link from '../templates/navbar/external-link';
import submenu from '../templates/navbar/submenu';
import pagelink from '../templates/navbar/page-link';

const navbar: Collection = {
    label: 'Meny',
    name: 'navbar',
    path: 'content/navbar',
    format: 'json',
    fields: [
        {
            name: 'logo',
            label: 'Logga',
            type: 'image',
        },
        {
            label: 'Menyval',
            name: 'top_level_items',
            type: 'object',
            list: true,
            templates: [pagelink, submenu, link],
        },
        {
            label: 'Call to action knapp',
            name: 'cta',
            type: 'object',
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
        },
    ],
    ui: {
        global: true,
        router: () => '/',
    },
};

export default navbar;
