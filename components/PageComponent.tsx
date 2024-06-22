import { Page } from '@/tina/__generated__/types';
import { PencilIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import { tinaField, useEditState, useTina } from 'tinacms/dist/react';
import { Layout } from './Layout';
import Sections from './sections/Sections';

export default function PageComponent(props: StaticProps) {
    const { edit } = useEditState();
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });
    const page = data.page;

    return (
        <>
            <Head>
                <title>Hello</title>
            </Head>
            <Layout
                navItems={props.navItems}
                footerProps={props.footerProps}
                navbarProps={props.navbarProps}
                title={data.page.title}
                englishTitle={data.page.titleEnglish}
            >
                <Sections content={data.page as Page}></Sections>
                {edit && (
                    <button data-tina-field={tinaField(data.page, 'title')} className="sticky bottom-0 left-0 bg-blue-400 text-white p-4 text-xl ">
                        Redigera sida <PencilIcon className="w-4 h-4 inline-block" />
                    </button>
                )}
            </Layout>
        </>
    );
}
