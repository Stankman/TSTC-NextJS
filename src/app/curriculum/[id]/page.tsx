import { Heading, Section } from "@/components/global/craft";
import PageHeader from "@/components/global/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api/api";
import { KualiCourse, KualiSpecialization } from "@/types/kuali";

export default async function Page(
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const specialization: KualiSpecialization = await apiFetch(`/kuali/specializations/${id}`);

    return (
        <>
            <PageHeader title={specialization.title} breadcrumbs={false}></PageHeader>
            <Section>
                <div className="p-5">
                    <div>{specialization.start}</div>
                    <div className="">{specialization.code}</div>
                    <div className="">
                        <Badge>Completion Time: {specialization.monthsToComplete} months</Badge>
                    </div>
                    <div className="">Available at: {specialization.locations.map(location => location.name).join(", ")}</div>
                </div>
                {specialization.semesters.map((semester) => (
                    <div key={semester.label}>
                        <div className="bg-[#f5f6fa] text-[#393939] p-5 rounded">
                            <Heading className="mb-0" size="h5">{semester.label}</Heading>
                        </div>
                        {semester.blocks.map(async (block, index) => {
                            const courses = await Promise.all(
                                block.courseIds.map(async (courseId) => {
                                    const course: KualiCourse = await apiFetch(`/kuali/courses/${courseId}`) as KualiCourse;
                                    return { courseId, course };
                                })
                            );
                            return <div key={index} className="p-5" >
                                <Heading size="h6">{block.optional ? "Complete at least 3 credits from the following" : "Complete the following"}</Heading>
                                <Accordion
                                    type="multiple"
                                >
                                    {courses.map(({ courseId, course }) => (
                                        <AccordionItem key={courseId} value={courseId}>
                                            <AccordionTrigger>
                                                <div className="w-full grid grid-cols-6 gap-4">
                                                    <div className="col">{course.code}</div>
                                                    <div className="col">{course.number}</div>
                                                    <div className="col-span-3">{course.title}</div>
                                                    <div className="col">{course.totalCredits}</div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>;
                        })}
                        <div className="flex justify-between items-center p-5">
                            <Heading className="mb-0" size="h6">Semester Total Credits</Heading>
                            <div>{semester.totalCredits} Credits</div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between items-center bg-[#f5f6fa] text-[#393939] p-5 rounded">
                    <Heading className="mb-0" size="h6">Degree Plan Total Credits</Heading>
                    <div className="font-bold text-lg">{specialization.totalCredits} Credits</div>
                </div>
            </Section>
            <Section>
                <div className="p-5">
                    <Heading size="h5">Pre/Co-Requisites</Heading>
                    <ul className="list-disc list-inside">
                        {specialization.prerequisites.map((prerequisite, index) => (
                            <li key={index}>{prerequisite}</li>
                        ))}
                    </ul>
                </div>
            </Section>
        </>
    );
}