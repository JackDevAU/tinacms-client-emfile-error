import { PageSectionsSection } from '@/tina/__generated__/types';
import React from 'react';
import CardContainer from './Card/CardContainer';
import Content from './Content';
import DoubleImage from './DoubleImage';
import DoubleText from './DoubleText';
import TextImage from './TextImage';
import Button from './Button';
import Title from './Title';
import Image from './Image';

const Blocks = (props: { content: PageSectionsSection }) => {
    const blocks = props.content.blocks ?? [];
    const blocksComponents = blocks
        .flatMap((block) => {
            switch (block?.__typename) {
                case 'PageSectionsSectionBlocksTitle':
                    return <Title content={block} />;
                case 'PageSectionsSectionBlocksContent':
                    return <Content content={block} />;
                case 'PageSectionsSectionBlocksDoubleImage':
                    return <DoubleImage data={block} />;
                case 'PageSectionsSectionBlocksImage':
                    return <Image data={block} />;
                case 'PageSectionsSectionBlocksDoubleText':
                    return <DoubleText data={block} />;
                case 'PageSectionsSectionBlocksTextImage':
                    return <TextImage data={block} />;
                case 'PageSectionsSectionBlocksCard':
                    return <CardContainer data={block} />;
                case 'PageSectionsSectionBlocksButton':
                    return <Button content={block} />;
                default:
                    return [];
            }
        })
        .map((blockComponent, i) => <React.Fragment key={i}>{blockComponent}</React.Fragment>);
    return <>{blocksComponents}</>;
};

export default Blocks;
