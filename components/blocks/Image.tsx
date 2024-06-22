import { tinaField } from 'tinacms/dist/react';
import { PageSectionsSectionBlocksImage } from '@/tina/__generated__/types';
import { useRouter } from 'next/router';

const Image = (props: { data: PageSectionsSectionBlocksImage }) => {
    const router = useRouter();
    const locale = router.locale as 'sv' | 'en';

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-5xl px-8">
                <div className="flex items-center justify-center">
                    <img className="object-center" data-tina-field={tinaField(props.data, 'src')} alt={props.data[`alt_${locale}`]} src={props.data.src} />
                </div>
            </div>
        </div>
    );
};

export default Image;
