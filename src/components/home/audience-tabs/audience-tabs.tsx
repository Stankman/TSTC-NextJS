import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence } from "motion/react";
import AudienceContent from "./audience-content";
import { Heading } from "@/components/global/craft";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface AudienceTabsProps {
    title?: string;
}

export default function AudienceTabs({ title }: AudienceTabsProps) {
    return (
        <>
            { title && <Heading size="h2">{title}</Heading>}
            <Tabs defaultValue="new-students" className="mt-10">
                <ScrollArea>
                    <TabsList className="mb-5 text-lg lg:text-xl">
                        <TabsTrigger value="new-students">New Students</TabsTrigger>
                        <TabsTrigger value="career-changers">Career-Changers</TabsTrigger>
                        <TabsTrigger value="veterans">Veterans</TabsTrigger>
                        <TabsTrigger value="employers">Employers</TabsTrigger>
                        <TabsTrigger value="business-leaders">Business Leaders</TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <AnimatePresence mode="wait">
                    <TabsContent key="new-students" value="new-students">
                        <AudienceContent
                            title="New Students"
                            content="Explore programs, admissions, and financial aid options to kickstart your education journey."
                            buttonText="Take the First Step"
                            imageSrc="/dummies/dummy-image.jpeg"
                        />
                    </TabsContent>
                    <TabsContent key="career-changers" value="career-changers">
                        <AudienceContent
                            title="Career-Changers"
                            content="Shift gears with our focused programs in fields like instrumentation or medical equipment repair. Build on your existing experience with a certificate or degree or use your experience to move ahead in classes and take advantage of flexible scheduling."
                            buttonText="Change Your Career"
                            imageSrc="/dummies/dummy-image-2.jpeg"
                        />
                    </TabsContent>
                    <TabsContent key="veterans" value="veterans">
                        <AudienceContent
                            title="Veterans"
                            content="Leverage your military experience with our tailored programs that recognize your unique skills and challenges."
                            buttonText="Explore Veteran Programs"
                            imageSrc="/dummies/dummy-image-2.jpeg"
                        />
                    </TabsContent>
                    <TabsContent key="employers" value="employers">
                        <AudienceContent
                            title="Employers"
                            content="Partner with us to upskill your workforce and meet the demands of a changing job market."
                            buttonText="Learn About Employer Partnerships"
                            imageSrc="/dummies/dummy-image-2.jpeg"
                        />
                    </TabsContent>
                    <TabsContent key="business-leaders" value="business-leaders">
                        <AudienceContent
                            title="Business Leaders"
                            content="Stay ahead of industry trends and equip your team with the skills they need to succeed."
                            buttonText="Discover Business Solutions"
                            imageSrc="/dummies/dummy-image.jpeg"
                        />
                    </TabsContent>
                </AnimatePresence>
            </Tabs>
        </>
    );
}