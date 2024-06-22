import { PageSectionsSectionBlocksCardCardList } from '@/tina/__generated__/types';
import { Disclosure, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const Card = (props: { data: PageSectionsSectionBlocksCardCardList }) => {
    const router = useRouter();
    const locale = router.locale as 'sv' | 'en';

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="flex flex-col items-center w-96 h-72 shadow-xl rounded-3xl overflow-hidden ">
                <div className="h-96 overflow-hidden">
                    {props.data.image != null ? (
                        <>
                            <img data-tina-field={tinaField(props.data, 'image')} src={props.data.image} alt="" className="h-44 w-full object-cover" />
                        </>
                    ) : (
                        <></>
                    )}

                    <h3 data-tina-field={tinaField(props.data, `title_${locale}`)} className="my-3.5 px-7 self-start font-bold text-xl">
                        {props.data[`title_${locale}`]}
                    </h3>
                    <div
                        className={`tina-markdown-container rounded w-full text-left px-6 break-words overflow-hidden`}
                        data-tina-field={tinaField(props.data, `text_${locale}`)}
                    >
                        <TinaMarkdown content={props.data[`text_${locale}`]} />
                    </div>
                </div>
                <button className="w-full font-semibold text-special-green hover:underline top-shadow self-end mt-auto" onClick={openModal}>
                    <span>{locale === 'en' ? 'Read more' : 'Läs mer'}</span>
                </button>
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30 z-49" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-50  overflow-y-scroll">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto max-w-4xl bg-white rounded-xl ">
                        <div className="flex flex-col items-center max-w-7xl shadow-xl relative">
                            {props.data.image != null ? (
                                <>
                                    <img data-tina-field={tinaField(props.data, 'image')} src={props.data.image} alt="" className="w-full object-cover" />
                                </>
                            ) : (
                                <></>
                            )}

                            <h3 data-tina-field={tinaField(props.data, `title_${locale}`)} className="my-3.5 px-7 self-start font-bold text-xl">
                                {props.data[`title_${locale}`]}
                            </h3>
                            <div
                                className={`tina-markdown-container rounded w-full text-left px-6 break-words h-min-content `}
                                data-tina-field={tinaField(props.data, `text_${locale}`)}
                            >
                                <TinaMarkdown content={props.data[`text_${locale}`]} />
                            </div>

                            <button
                                className="w-full font-semibold text-special-green p-2 hover:underline flex justify-center items-center gap-1"
                                onClick={closeModal}
                            >
                                <span>{locale === 'en' ? 'Close' : 'Stäng'}</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default Card;
