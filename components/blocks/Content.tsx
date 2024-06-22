import { PageSectionsSectionBlocksContent } from '@/tina/__generated__/types';
import { useRouter } from 'next/router';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const Content = (props: { content: PageSectionsSectionBlocksContent }) => {
    const { content } = props;
    const router = useRouter();
    const locale = router.locale as 'sv' | 'en';
    const markdownContent = locale === 'sv' ? content?.content : content?.content_en;
    const fieldKey = locale === 'sv' ? 'content' : 'content_en';
    return (
        <div className="tina-markdown-container px-8" data-tina-field={tinaField(content, fieldKey)}>
            <TinaMarkdown content={markdownContent} />
        </div>
    );
};

export default Content;
