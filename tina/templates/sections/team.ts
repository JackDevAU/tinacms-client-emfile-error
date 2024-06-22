import { deslugifyStaff } from '../../../lib/deslugify';
import { Template } from 'tinacms';

const teamBlock: Template = {
    name: 'team',
    label: 'Grupp',
    fields: [
        {
            label: 'Grupptitel',
            name: 'teamTitle',
            type: 'string',
        },
        {
            label: 'Grupptitel engelska',
            name: 'teamTitleEnglish',
            type: 'string',
        },
        {
            label: 'Gruppbeskrivning',
            name: 'teamDescription',
            type: 'string',
        },
        {
            label: 'Gruppbeskrivning engelska',
            name: 'teamDescriptionEnglish',
            type: 'string',
        },
        {
            type: 'object',
            label: 'Grupplista',
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
                    label: 'Kårmedlemmar',
                    name: 'staff',
                    type: 'reference',
                    collections: ['staff'],
                },
            ],
        },
    ],
};

export default teamBlock;
