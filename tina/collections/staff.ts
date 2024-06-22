import { Collection } from 'tinacms';
import { isEmail } from 'validator';

const validateEmail = (email: string) => {
    if (!email) {
        return true;
    }
    return isEmail(email);
};

const staff: Collection = {
    label: 'Kårmedlemmar',
    name: 'staff',
    path: 'content/staff',
    ui: {
        filename: {
            readonly: true,
            slugify: (values: { name?: string; title?: string }) => {
                return `${values?.name?.toLowerCase().replace(/ /g, '-') || 'no-name'}_${values?.title?.toLowerCase().replace(/ /g, '-') || 'no-title'}`;
            },
        },
    },
    fields: [
        {
            type: 'string',
            label: 'Namn',
            name: 'name',
            isTitle: true,
            required: true,
        },
        {
            type: 'string',
            label: 'Titel',
            name: 'title',
            required: true,
        },
        {
            type: 'string',
            label: 'Titel engelska',
            name: 'titleEnglish',
            required: true,
        },
        {
            type: 'image',
            label: 'Bild',
            name: 'photo',
        },
        {
            type: 'string',
            label: 'E-post',
            name: 'email',
            ui: {
                validate: (email: string) => {
                    if (!validateEmail(email)) {
                        return 'Ogiltig e-postadress';
                    }
                    return '';
                },
            },
        },
        {
            type: 'string',
            label: 'Ansvarsområden',
            name: 'responsibilities',
            list: true,
            ui: {
                component: 'tags',
            },
        },
        {
            type: 'string',
            label: 'Ansvarsområden engelska',
            name: 'responsibilitiesEnglish',
            list: true,
            ui: {
                component: 'tags',
            },
        },
    ],
};

export default staff;
