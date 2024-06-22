import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function SearchInput() {
    const inputRef = useRef(null);
    const { locale } = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [modifierKey, setModifierKey] = useState('Ctrl+'); // Default value

    useEffect(() => {
        setModifierKey(navigator.userAgent.includes('Mac') ? '⌘' : 'Ctrl+');

        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault(); // Prevent default action to avoid conflicts
                inputRef.current.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // TODO: make smaller when not focused to save some width

    return (
        <div>
            <div className="relative flex items-center max-w-44 ml-14 min-w-28">
                <input
                    ref={inputRef} // Use ref to focus this input
                    type="text"
                    name="search"
                    id="search"
                    placeholder={locale === 'en' ? 'Search' : 'Sök'}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`transition-all duration-300 ease-in-out ${
                        isFocused ? 'w-full' : 'w-full'
                    } block rounded-2xl border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-3">
                    <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">{modifierKey}K</kbd>
                </div>
            </div>
        </div>
    );
}
