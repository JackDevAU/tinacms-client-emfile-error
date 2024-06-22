import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';

export const runtime = 'nodejs'; // 'nodejs' (default) | 'edge'

export const Layout = (props: {
    navItems: NavItem[];
    children: ReactNode;
    footerProps: FooterProps;
    navbarProps: NavbarProps;
    title: string;
    englishTitle: string;
}) => {
    const router = useRouter();
    const locale = router.locale as 'sv' | 'en';
    const { navItems, title, englishTitle } = props;
    return (
        <>
            <Head>
                <title> {locale === 'sv' ? title : englishTitle}</title>
                <meta name="description" content="" />
            </Head>
            <div className="min-h-dvh">
                <Navbar navItems={navItems} tinaProps={props.navbarProps}></Navbar>

                <main className="w-full ">{props.children}</main>
            </div>
            <Footer data={props.footerProps.data} query={props.footerProps.query} variables={props.footerProps.variables} />
        </>
    );
};
