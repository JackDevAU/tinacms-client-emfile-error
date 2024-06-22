import { defineConfig, TinaCMS, EventBus } from 'tinacms';
import { page, staff, footer, navbar } from './collections';
import { useEffect } from 'react';
// Your hosting provider likely exposes this as an environment variable
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

export default defineConfig({
    branch,

    // Get this from tina.io
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    // Get this from tina.io
    token: process.env.TINA_TOKEN,
    search: {
        tina: {
            indexerToken: process.env.TINA_SEARCH,
        },
    },

    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },
    media: {
        tina: {
            mediaRoot: '',
            publicFolder: 'public',
        },
    },
    // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
    schema: {
        collections: [navbar, page, footer, staff],
    },
    cmsCallback(cms) {
        cms.events.subscribe('cms:enable', () => {
            addStylesheet('tina.css');

            modifyTopleftMenu();

            const rootElement = document.getElementById('root').children[0] as HTMLElement;
            rootElement.dataset.uiMutations = '0';

            // changes happen async so observing when the menu is avalible is necessary
            const observer = createObserver(rootElement, modifyTopleftMenu);
            observer.observe(rootElement, { characterData: true, childList: true, attributes: false, subtree: true });

            window.addEventListener('click', (event) => {
                if ((event.target as HTMLElement).tagName === 'A') {
                    observer.disconnect();
                    modifyTopleftMenu();
                    setTimeout(() => {
                        observer.observe(rootElement, { characterData: true, childList: true, attributes: false, subtree: true });
                    }, 100);
                }
            });
        });
    },
});

function addStylesheet(href: string) {
    const styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.href = href;
    document.head.appendChild(styleLink);
}

function modifyTopleftMenu() {
    const menus = document.querySelectorAll<HTMLElement>('[id^="headlessui-menu-button-"]');

    menus.forEach((menu) => {
        menu.style.minHeight = '64px';

        const text = menu.querySelector<HTMLElement>('span > span');
        if (text && text.innerHTML !== 'Admin') {
            text.innerHTML = 'Admin';
            console.log('changed text of', text);
        }

        const icon = menu.querySelector<HTMLElement>('span > svg');
        if (icon) {
            const newIcon = document.createElement('img');
            newIcon.src = '';
            newIcon.alt = 'logo';
            newIcon.width = 45;
            newIcon.height = 65;
            newIcon.style.marginRight = '11px';
            icon.replaceWith(newIcon);
        }
    });
}

function createObserver(element: HTMLElement, callback: (uiMutations: number) => void) {
    return new MutationObserver((mutationsList, observer) => {
        if (mutationsList.length > 1000) {
            return;
        }
        observer.disconnect();
        let uiMutations = parseInt(element.dataset.uiMutations, 10);
        callback(uiMutations + 1);
        element.dataset.uiMutations = (uiMutations + 1).toString();
        setTimeout(() => {
            observer.observe(element, { characterData: true, childList: true, attributes: false, subtree: true });
        }, 100);
    });
}
