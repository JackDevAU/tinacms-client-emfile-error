import { PageSectionsSection } from '@/tina/__generated__/types';
import { tinaField, useEditState } from 'tinacms/dist/react';
import Blocks from '../blocks/Blocks';

export const DefaultSection = (props: { content: PageSectionsSection }) => {
    const { edit } = useEditState();
    return (
        <section className="w-full flex">
            <aside className="flex-1"></aside>
            <article className="flex flex-col max-w-5xl grow w-full gap-5 relative">
                <Blocks content={props.content} />
                {edit && (
                    <button data-tina-field={tinaField(props.content, 'name')} className="absolute right-0 bg-blue-400 text-white p-2 w-1/4">
                        Redigera avsnitt
                    </button>
                )}
            </article>
            <aside className="flex-1"></aside>
        </section>
    );
};
