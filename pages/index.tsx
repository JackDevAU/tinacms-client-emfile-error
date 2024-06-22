import { client } from '../tina/__generated__/client';
import PageComponent from '../components/PageComponent';
import { getNavItems } from '../lib/nav';

export const getStaticProps = async ({ preview = false }) => {
    const { data, query, variables } = await client.queries.page({
        relativePath: 'home.mdx',
    });

    const navItems = await getNavItems({ preview });
    const footerProps = await client.queries.footer({
        relativePath: 'footer.json',
    });
    const navbarProps = await client.queries.navbar({
        relativePath: 'navbar.json',
    });

    return {
        props: {
            data,
            query,
            variables,
            navItems,
            footerProps,
            navbarProps,
        },
    };
};

export default PageComponent;
