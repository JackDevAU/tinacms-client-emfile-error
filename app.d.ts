import { Exact, PageQuery, Query, FooterQuery, NavbarQuery } from '@/tina/__generated__/types';

interface TinaProps {
    query: string;
    variables: Exact<{
        relativePath: string;
    }>;
}
declare global {
    interface NavItem {
        path: string[];
        title: string;
        titleEnglish: string;
        order: number | null;
        hide: boolean;
        children?: NavItem[];
    }

    interface NavbarProps extends TinaProps {
        data: NavbarQuery;
    }

    interface FooterProps extends TinaProps {
        data: FooterQuery;
    }

    interface StaticProps extends TinaProps {
        data: PageQuery;
        navItems: NavItem[];
        footerProps: FooterProps;
        navbarProps: NavbarProps
    }
}
