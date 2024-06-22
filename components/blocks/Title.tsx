import { PageSectionsSectionBlocksTitle } from '@/tina/__generated__/types';
import { useRouter } from 'next/router';
import { tinaField } from 'tinacms/dist/react';

const Title = (props: { content: PageSectionsSectionBlocksTitle }) => {
    const { content } = props;
    const locale = useRouter().locale as 'sv' | 'en';
    const text = locale === 'en' ? content?.text_en : content?.text;
    const fieldKey = locale === 'en' ? 'text_en' : 'text';
    return (
        <h1 className="border-b-2 border-special-green pb-4 px-6 text-4xl" data-tina-field={tinaField(content, fieldKey)}>
            {text ?? 'Edit me!'}
        </h1>
    );
};

export default Title;
