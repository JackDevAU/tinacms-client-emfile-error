import { Collection } from 'tinacms';
import { textSideInfo, hero, team, defaultSection } from '../templates/sections';

const page: Collection = {
    name: 'page',
    label: 'Page Content',
    path: 'content/page',
    format: 'mdx',
    fields: [
        {
            name: 'draft',
            label: 'Utkast',
            type: 'boolean',
        },
        {
            name: 'title',
            label: 'Titel',
            type: 'string',
            isTitle: true,
            required: true,
        },
        {
            name: 'titleEnglish',
            label: 'Titel engelska',
            type: 'string',
            required: true,
        },
        {
            name: 'order',
            label: 'Ordning i navigationsmenyn',
            type: 'number',
            description: 'Vilken plats sidan ska ha i navigations menyn',
        },
        {
            name: 'hide_in_navbar',
            label: 'Visa ej i navigationsmenyn',
            type: 'boolean',
        },
        {
            name: 'sections',
            label: 'Avsnitt',
            type: 'object',
            list: true,
            ui: {
                visualSelector: true,
            },
            templates: [defaultSection, hero, textSideInfo, team],
        },
    ],
    defaultItem: {
        draft: false,
        title: '',
        titleEnglish: '',
        order: 0,
        hide_in_navbar: false,
        blocks: [],
    },
    ui: {
        router: ({ document }) => {
            if (document._sys.filename === 'home') {
                return `/`;
            } else {
                const path = document._sys.breadcrumbs.join('/');
                return path;
            }
        },
    },
};

export default page;
