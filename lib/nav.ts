import { client } from '../tina/__generated__/client';

function navSorter(pageA: NavItem, pageB: NavItem) {
    // Sort numerically
    if (pageA.order !== null && pageB.order !== null) {
        return pageA.order - pageB.order;
    }
    // A has no order, B does, A comes after B
    if (pageA.order === null && pageB.order !== null) {
        return 1;
    }
    // A has order, B doesn't, A comes before B
    if (pageA.order !== null && pageB.order === null) {
        return -1;
    }
    // Both have no order, consider them equal
    return 0;
}

export async function getNavItems({ preview }: { preview: boolean }): Promise<NavItem[]> {
    let filter: {} = { draft: { eq: false } };

    // if preview-mode is enabled, get all posts
    if (preview) {
        filter = {};
    }

    const { data } = await client.queries.pageConnection({
        filter,
    });
    const edges = data.pageConnection.edges ?? [];
    const allPages: NavItem[] = edges.flatMap((page) => {
        if (page?.node) {
            const path = page.node._sys.breadcrumbs.map((breadcrumb) => (breadcrumb === 'home' ? '' : breadcrumb)); // Adjust path for 'home' to make url nicer
            return {
                path,
                title: page.node.title,
                titleEnglish: page.node.titleEnglish,
                order: page.node.order ?? null,
                hide: page.node.hide_in_navbar ?? false,
            };
        } else {
            return [];
        }
    });

    // Only pages two levels deep in the navbar
    // hide home page in navbar, use logo for navigating to home
    const pages = allPages.filter((page) => page.path.length <= 2 && page.hide !== true && page.title !== 'Hem');

    const topLevelOptions = pages.filter((page) => page.path.length === 1);
    const secondLevelOptions = pages.filter((page) => page.path.length === 2);

    const navItems = topLevelOptions
        .map((option) => {
            const childOptions = secondLevelOptions.filter((page) => page.path[0] === option.path[0] && page.path.length === 2).sort((a, b) => navSorter(a, b));

            return {
                ...option,
                children: childOptions.sort((a, b) => navSorter(a, b)),
            };
        })
        .sort((a, b) => navSorter(a, b));

    return navItems;
}
