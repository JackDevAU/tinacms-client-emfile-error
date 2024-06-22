import { client } from '../tina/__generated__/client';
import { getNavItems } from '../lib/nav';
import PageComponent from '../components/PageComponent';
import { GetStaticProps, GetStaticPaths } from 'next';
export default PageComponent;
export const runtime = 'nodejs'; // 'nodejs' (default) | 'edge'

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.queries.pageConnection();
    const edges = data.pageConnection.edges ?? [];
    const paths = edges.flatMap((post) => {
        return post && post.node
            ? [
                  { params: { slug: post.node._sys.breadcrumbs }, locale: 'en' },
                  { params: { slug: post.node._sys.breadcrumbs }, locale: 'sv' },
              ]
            : [];
    });
    return {
        paths,
        fallback: 'blocking',
    };
};

// This is an example of a page generated with Serverside Rendering.
// This can be switched to a static page by using getStaticProps
export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
    const slug = (params?.slug as String[]) ?? [];
    const { data, query, variables } = await client.queries.page({
        relativePath: `/${slug.join('/')}.mdx`,
    });
    let navItems = await getNavItems({ preview });
    const footerProps = await client.queries.footer({
        relativePath: 'footer.json',
    });
    const navbarProps = await client.queries.navbar({
        relativePath: 'navbar.json',
    });
    return {
        notFound: data?.page?.draft && !preview,
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
