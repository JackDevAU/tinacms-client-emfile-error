import { PageSectionsSectionBlocksDoubleImage } from '@/tina/__generated__/types';
import { useRouter } from 'next/router';
import { tinaField } from 'tinacms/dist/react';

const DoubleImage = (props: { data: PageSectionsSectionBlocksDoubleImage }) => {
    const router = useRouter();
    const locale = router.locale as 'sv' | 'en';

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-5xl px-8">
                <div className="grid items-center justify-center gap-x-8 gap-y-10 sm:grid-cols-2 xl:gap-x-8 justify-items-center grid-cols-1">
                    <img className="object-center" data-tina-field={tinaField(props.data, 'src1')} alt={props.data[`alt1_${locale}`]} src={props.data.src1} />
                    <img className="object-center" data-tina-field={tinaField(props.data, 'src2')} alt={props.data[`alt2_${locale}`]} src={props.data.src2} />
                </div>
            </div>
        </div>
    );
};

export default DoubleImage;
