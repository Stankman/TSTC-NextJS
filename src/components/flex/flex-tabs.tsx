import { TabsBlock } from "@/types/wordpress";
import { Heading, Section } from "../global/craft";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimatePresence } from "motion/react";
import { ScrollBar } from "../ui/scroll-area";

interface FlexTabsProps {
    properties: TabsBlock;
}

export default function FlexTabs({ properties }: FlexTabsProps) {
    const tabsId = `tabs-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <Section>
            <div id={tabsId}>
                <div id="tabs-header">
                    {properties.content.header && (<Heading size="h3" className="font-semibold">{properties.content.header}</Heading>)}
                    {properties.content.description && (<div dangerouslySetInnerHTML={{ __html: properties.content.description }} />)}
                </div>
                <div id="tabs-container">
                    <Tabs defaultValue={properties.content.items[0]?.title} className="mt-10">
                        <ScrollArea>
                            <TabsList className="mb-5 text-lg lg:text-xl">
                                {properties.content.items.map((tab, index) => (
                                    <TabsTrigger key={index} value={tab.title}>{tab.title}</TabsTrigger>
                                ))}
                            </TabsList>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <AnimatePresence mode="wait">
                            {properties.content.items.map((tab, index) => (
                                <TabsContent key={index} value={tab.title}>
                                    <div dangerouslySetInnerHTML={{ __html: tab.content }} />
                                </TabsContent>
                            ))}
                        </AnimatePresence>
                    </Tabs>
                </div>
            </div>
        </Section>
    );
}