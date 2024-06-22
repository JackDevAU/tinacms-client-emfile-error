import { Staff } from '@/tina/__generated__/types';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { tinaField } from 'tinacms/dist/react';

export const TeamPerson = (props: { data: Staff }) => {
    const { locale } = useRouter();
    const person = props.data;
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const responsibilities = (locale === 'en' ? person.responsibilitiesEnglish : person.responsibilities) ?? [];
    return (
        <li className="grid justify-items-center grid-rows-5" style={{ gridTemplateRows: 'repeat(5, max-content)' }} key={person.name + Math.random()}>
            <img
                data-tina-field={tinaField(person, 'photo')}
                className="shadow-md mx-auto p-2 h-56 w-56 rounded-full object-cover border-4 border-green-600"
                src={person.photo ?? ''}
                alt=""
            />
            <h3 data-tina-field={tinaField(person, 'name')} className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.name}
            </h3>
            <p data-tina-field={tinaField(person, locale === 'en' ? 'titleEnglish' : 'title')} className="text-sm leading-6 text-gray-600">
                {locale === 'en' ? person.titleEnglish : person.title}
            </p>

            <div className="grid justify-items-center min-h-40 mt-3 gap-y-3 items-start" style={{ gridTemplateRows: 'max-content 1fr' }}>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex items-center mt-2">
                                <span>{locale === 'en' ? 'Read more' : 'Läs mer'}</span>
                                <ChevronDownIcon className={`h-5 w-5 transition-transform ${open ? '-rotate-180 transform' : ''}`} aria-hidden="true" />
                            </Disclosure.Button>

                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="text-sm mt-2">
                                    <div className="grid gap-2 justify-items-center text-center">
                                        {responsibilities.length > 0 && (
                                            <span data-tina-field={tinaField(person, locale === 'en' ? 'responsibilitiesEnglish' : 'responsibilities')}>
                                                <b>{locale === 'en' ? 'Responsibilities' : 'Ansvarsområden'}</b>
                                            </span>
                                        )}
                                        {responsibilities.map((responsibility, i, arr) => responsibility + (i === arr.length - 1 ? '' : ', ')).join('')}
                                        {person.email && (
                                            <>
                                                <span className="flex gap-1">
                                                    <a
                                                        href={`mailto:${person.email}`}
                                                        data-tina-field={tinaField(person, 'email')}
                                                        className="underline text-special-green"
                                                    >
                                                        {person.email}
                                                    </a>

                                                    <button
                                                        data-tooltip-content="Kopierad!"
                                                        data-tooltip-id={`tooltip-${person.name}`}
                                                        onClick={(event) => {
                                                            navigator.clipboard.writeText(person.email).then(() => {
                                                                setTooltipVisible(true);

                                                                // Hide the tooltip after 1 second
                                                                setTimeout(() => {
                                                                    setTooltipVisible(false);
                                                                }, 1000);
                                                            });
                                                        }}
                                                    >
                                                        <ClipboardDocumentCheckIcon className="text-gray-600 w-5" />
                                                    </button>
                                                </span>
                                                {<Tooltip id={`tooltip-${person.name}`} place="top" isOpen={tooltipVisible} />}{' '}
                                            </>
                                        )}
                                    </div>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
            </div>
        </li>
    );
};
