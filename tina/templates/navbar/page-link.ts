import client from '@/tina/__generated__/client';
import { Template } from 'tinacms';

const pagelink: Template = {
    name: 'pagelink',
    label: 'Länk till sida',
    fields: [
        {
            label: 'Sida',
            name: 'page',
            type: 'reference',
            collections: ['page'],
        },
    ],
    ui: {
        itemProps: (item: { page?: string }) => ({
            label: item.page ? `${item?.page.split('/').slice(2).join('/').replace('.mdx', '')} →` : 'Sidlänk',
        }),
    },
};

export default pagelink;
