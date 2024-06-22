import { supportsFlagEmoji } from '@/lib/utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LangButton() {
    const { locale } = useRouter();
    const router = useRouter();

    const LanguageLabel = (lang) => {
        const [showFlag, setShowFlag] = useState(false);

        useEffect(() => {
            // Call supportsFlagEmoji only in the client side
            setShowFlag(supportsFlagEmoji());
        }, []);

        switch (lang) {
            case 'en':
                return <>English</>;
            case 'sv':
                return <>Svenska </>;

            default:
                break;
        }
    };
    return (
        <>
            {locale === 'en' ? (
                <button
                    className="text-sm min-w-max"
                    onClick={async () => {
                        Cookies.set('NEXT_LOCALE', 'sv');
                        const { pathname, asPath, query } = router;
                        // change just the locale and maintain all other route information including href's query
                        await router.push({ pathname, query }, asPath, {
                            locale: 'sv',
                        });
                    }}
                >
                    {LanguageLabel('sv')}
                </button>
            ) : (
                <button
                    className="text-sm min-w-max"
                    onClick={async () => {
                        Cookies.set('NEXT_LOCALE', 'en');
                        const { pathname, asPath, query } = router;
                        // change just the locale and maintain all other route information including href's query
                        await router.push({ pathname, query }, asPath, {
                            locale: 'en',
                        });
                    }}
                >
                    {LanguageLabel('en')}
                </button>
            )}
        </>
    );
}
