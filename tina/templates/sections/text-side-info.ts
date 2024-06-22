import { deslugifyStaff } from '../../../lib/deslugify';
import { Template } from 'tinacms';
const textSideInfo: Template = {
    name: 'textSideInfo',
    label: 'Text + sidinfo',
    fields: [
        {
            label: 'Kategorititel',
            name: 'category_title_sv',
            type: 'string',
        },
        {
            label: 'Kategorititel engelska',
            name: 'category_title_en',
            type: 'string',
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
            label: 'Text',
            name: 'text_sv',
            type: 'rich-text',
        },
        {
            label: 'Text engelska',
            name: 'text_en',
            type: 'rich-text',
        },
        {
            type: 'object',
            label: 'Team list',
            name: 'teamList',
            list: true,
            ui: {
                itemProps: (item: { staff?: string }) => {
                    // Field values are accessed by item?.<Field name>
                    if (item?.staff) {
                        // Deslugify
                        return {
                            label: deslugifyStaff(item.staff)
                        }
                    }
                    return {};
                },
            },
            fields: [
                {
                    label: 'Staff',
                    name: 'staff',
                    type: 'reference',
                    collections: ['staff'],
                },
            ],
        },
    ],
};

export default textSideInfo;
