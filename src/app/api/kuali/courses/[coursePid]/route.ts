
import { fetchKualiCourseByPid } from "@/lib/kuali/courses/kuali-courses";
import { KualiCourse } from "@/types/kuali";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ coursePid: string }> }
) {
  try {
    const { coursePid: courseId } = await params;

    const latest = await fetchKualiCourseByPid(courseId);

    if(!latest) {
      return NextResponse.json({ error: "[Kuali Client] Course not found" }, { status: 404 });
    }

    const response : KualiCourse = {
      pid: latest.pid,
      title: latest.title,
      description: latest.description,
      code: latest.subjectCode,
      number: latest.number,
      labHours: Number.parseFloat(latest.lab) || 0,
      lectureHours: Number.parseFloat(latest.lecture) || 0,
      totalCredits: Number.parseFloat(latest.semesterCreditHours) || 0
    };

    return NextResponse.json(response);
  } catch(error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (/404/.test(errorMessage)) {
        return NextResponse.json(
            { error: "[Kuali Client] Course not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { error: "[Kuali Client] Internal server error" },
        { status: 500 }
    );
  }
}