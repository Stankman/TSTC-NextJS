import { AccordionBlock, DefaultBlock, GridBlock, StatsBlock, TabsBlock } from '@/types/wordpress';
import dynamic from 'next/dynamic';

const BLOCKS: Record<string, React.ComponentType<any>> = {
    'accordion': dynamic(() => import('./flex-accordion')),
    'default': dynamic(() => import('./flex-default')),
    'grid': dynamic(() => import('./flex-grid')),
    'stats': dynamic(() => import('./flex-stats')),
    'tabs': dynamic(() => import('./flex-tabs'))
}; 

interface FlexBlockProps {
    layout: string;
    properties: AccordionBlock | DefaultBlock | GridBlock | StatsBlock | TabsBlock;
}

export default async function FlexBlock({ layout, properties }: FlexBlockProps) {
    const Component = BLOCKS[layout];
    if(!Component) return null;
    
    return (
        <>
            <Component properties={properties} />
        </>
    )
}