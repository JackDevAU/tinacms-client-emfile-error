import { Page } from '@/tina/__generated__/types';
import React from 'react';
import { DefaultSection } from './DefaultSection';
import { Hero } from './Hero';
import { Team } from './Team';
import { TextSideInfo } from './TextSideInfo';
// import { isEditing } from "tinacms/dist/edit-state";

const Sections = (props: { content: Page }) => {
    const sections = props.content.sections ?? [];
    const sectionsComponents = sections
        .flatMap((section) => {
            switch (section?.__typename) {
                case 'PageSectionsSection':
                    return <DefaultSection content={section} />;
                case 'PageSectionsHero':
                    return <Hero data={section} />;
                case 'PageSectionsTextSideInfo':
                    return <TextSideInfo data={section} />;
                case 'PageSectionsTeam':
                    return <Team data={section} />;
                default:
                    return [];
            }
        })
        .map((sectionComponent, i) => (
            <React.Fragment key={i}>
                <div className="section">{sectionComponent}</div>
            </React.Fragment>
        ));
    return <>{sectionsComponents}</>;
};

export default Sections;
