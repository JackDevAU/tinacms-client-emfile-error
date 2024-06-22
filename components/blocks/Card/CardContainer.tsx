import { PageSectionsSectionBlocksCard } from '@/tina/__generated__/types';
import Card from './Card';

const CardContainer = (props: { data: PageSectionsSectionBlocksCard }) => {
    const cardList = props.data?.cardList ?? [];
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                <ul role="list" className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    {cardList.map((card, i) => {
                        return (
                            <li key={i} className="flex flex-wrap place-content-evenly gap-8 justify-center">
                                <Card data={card} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CardContainer;
