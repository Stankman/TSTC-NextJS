import CourseCard from "@/components/courses/course-card";
import { Heading, Section } from "@/components/global/craft";

export default function CoursesBlock() {
    return (
        <Section variant="dark" className="relative after:content-[url('/hexagon-divider.svg')] after:z-20 after:absolute after:w-full after:top-full mb-10 md:mb-20 lg:mb-30 xl:mb-50">
            <Heading size="h3" className="font-bold text-center">Employable Skills for the Heart of Texas</Heading>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 py-4">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
        </Section>
    );
}