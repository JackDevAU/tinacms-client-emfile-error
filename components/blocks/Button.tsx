import { PageSectionsSectionBlocksButton } from '@/tina/__generated__/types';
import { useRouter } from 'next/router';
import { tinaField } from 'tinacms/dist/react';

const Button = (props: { content: PageSectionsSectionBlocksButton }) => {
    const content = props.content;
    const locale = useRouter().locale as 'sv' | 'en';
    const text = (locale === 'en' ? content?.text_en : content?.text) ?? 'Knapp';
    const fieldKey = locale === 'en' ? 'text_en' : 'text';
    return (
        <div className="flex justify-center">
            <a
                className="bg-special-green hover:bg-green-700 text-white font-semibold py-2 px-5 rounded flex justify-center"
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                data-tina-field={tinaField(content, fieldKey)}
            >
                {text}
            </a>
        </div>
    );
};

export default Button;
