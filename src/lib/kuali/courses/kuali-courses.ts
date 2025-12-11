import { cache } from "react";
import { kualiFetch } from "../kuali";
import { KualiCourseRaw } from "@/types/kuali";

export const fetchKualiCourseByPid = cache(async (pid: string): Promise<KualiCourseRaw> => {
    const cacheTags = ["kuali", "server", `course:${pid}`];
    return kualiFetch<KualiCourseRaw>(`/courses/${pid}/latestActive`, undefined, cacheTags);
});