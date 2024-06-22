import { PageSectionsHero } from '@/tina/__generated__/types';
import { useRouter } from 'next/router';
import { tinaField, useEditState } from 'tinacms/dist/react';

export const Hero = (props: { data: PageSectionsHero }) => {
    const { edit } = useEditState();

    const router = useRouter();
    const locale = router.locale as 'sv' | 'en';

    return (
        <div className="hero relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 no-top-margin">
            {edit && (
                <button data-tina-field={tinaField(props.data, 'title_sv')} className="absolute top-0 right-0 bg-blue-400 text-white p-2 w-1/4">
                    Redigera hero
                </button>
            )}
            {props.data.image ? (
                <img
                    src={props.data[`image`]}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                    data-tina-field={tinaField(props.data, `image`)}
                />
            ) : null}
            <div style={{ textShadow: '1px 1px 1px #000000' }} className="mx-auto max-w-2xl text-center drop-shadow-2xl">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl" data-tina-field={tinaField(props.data, `title_${locale}`)}>
                    {props.data[`title_${locale}`]}
                </h2>
                <p className="mt-6 text-xl leading-8 text-white" data-tina-field={tinaField(props.data, `subtitle_${locale}`)}>
                    {props.data[`subtitle_${locale}`]}
                </p>
            </div>
        </div>
    );
};
