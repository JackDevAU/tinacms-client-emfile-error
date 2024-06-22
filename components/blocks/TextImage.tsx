import { PageSectionsSectionBlocksTextImage } from '@/tina/__generated__/types';
import { useRouter } from 'next/router';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const TextImage = (props: { data: PageSectionsSectionBlocksTextImage }) => {
    const router = useRouter();
    const locale = router.locale as 'sv' | 'en';

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-5xl px-8">
                <div className="grid items-center justify-center sm:grid-cols-2 gap-x-8 gap-y-10 grid-cols-1 xl:gap-x-8">
                    <div className={'flex justify-center prose lg:prose-lg mg-4' + `${props.data.flip ? ' order-last' : ' order-first'}`}>
                        <img
                            className="object-center justify-self-center "
                            aria-hidden="true"
                            data-tina-field={tinaField(props.data, 'image')}
                            src={props.data.image ?? ''}
                        />
                    </div>
                    <div className="tina-markdown-container self-start prose lg:prose-lg mg-4" data-tina-field={tinaField(props.data, `content_${locale}`)}>
                        <TinaMarkdown content={props.data[`content_${locale}`]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextImage;
