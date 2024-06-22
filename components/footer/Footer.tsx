import { useRouter } from 'next/router';
import { tinaField, useTina } from 'tinacms/dist/react';
import AdminLink from '../navbar/AdminLink';

export default function Footer(props: FooterProps) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });
    const router = useRouter();
    const locale = router.locale as 'sv' | 'en';
    return (
        <footer className="bg-special-green/30 relative" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 sm:pb-8 lg:px-8 lg:py-16 lg:pb-8">
                <div className="justify-between flex flex-wrap gap-8 text-black max-w-6xl">
                    <div className="md:mt-0 md:basis-auto basis-full flex flex-grow justify-center">
                        <img
                            className="h-20 ms-auto me-auto"
                            src={data.footer?.logo || '#'}
                            alt="Company logo"
                            data-tina-field={tinaField(data.footer, 'logo')}
                        />
                    </div>
                    <div className="flex flex-wrap flex-grow justify-between gap-10 mx-6" data-tina-field={tinaField(data.footer, `columns`)}>
                        {data.footer.columns &&
                            data.footer.columns.map((column) => {
                                if (!column) return <div key={Math.random()}>Kolumn</div>;
                                const header = column[`header_${locale}`] as string;
                                return (
                                    <div key={header} className="space-y-4 footer-column mx-4" data-tina-field={tinaField(column)}>
                                        <h1 className="text-3xl font-bold leading-6">
                                            {header ? header.charAt(0).toUpperCase() + header.slice(1) : '<Rubrik>'}
                                        </h1>

                                        <ul role="list" className="space-y-4">
                                            {column.rows?.map(
                                                (row) =>
                                                    row &&
                                                    (row.isHeader ? (
                                                        <li key={row[`text_${locale}`]} data-tina-field={tinaField(row)}>
                                                            <span className="leading-6 text-xl font-semibold">{row[`text_${locale}`] as string}</span>
                                                        </li>
                                                    ) : (
                                                        <li key={row[`text_${locale}`]} data-tina-field={tinaField(row)}>
                                                            {row.href != undefined ? (
                                                                <a href={row.href || '#'} className="leading-6 hover:text-white">
                                                                    {row[`text_${locale}`] as string}
                                                                </a>
                                                            ) : (
                                                                <span className="leading-6">{row[`text_${locale}`] as string}</span>
                                                            )}
                                                        </li>
                                                    )),
                                            )}
                                        </ul>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 right-4">
                <AdminLink />
            </div>
        </footer>
    );
}
