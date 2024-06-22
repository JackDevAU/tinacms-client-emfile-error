import { PageSectionsSectionBlocksDoubleText } from '@/tina/__generated__/types';
import { useRouter } from 'next/router';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const DoubleText = (props: { data: PageSectionsSectionBlocksDoubleText }) => {
    const router = useRouter();
    const locale = router.locale as 'sv' | 'en';
    return (
        <div className="mx-auto max-w-7xl px-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
            <div className="tina-markdown-container prose lg:prose-lg mg-4" data-tina-field={tinaField(props.data, `column1_${locale}`)}>
                <TinaMarkdown content={props.data[`column1_${locale}`]} />
            </div>
            <div className="tina-markdown-container prose lg:prose-lg mg-4" data-tina-field={tinaField(props.data, `column2_${locale}`)}>
                <TinaMarkdown content={props.data[`column2_${locale}`]} />
            </div>
        </div>
    );
};

export default DoubleText;
