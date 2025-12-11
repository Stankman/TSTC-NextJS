import { cache } from "react";
import { kualiFetch } from "../kuali";
import { KualiSpecializationRaw } from "@/types/kuali";

export const fetchKualiSpecializationById = cache(async (id: string): Promise<KualiSpecializationRaw> => {
    const cacheTags = ["kuali", "server", `specialization:${id}`];
    return kualiFetch<KualiSpecializationRaw>(`/specializations/${id}`, undefined, cacheTags);
});

export const getLatestSpecializationByPid = cache(async (pid: string): Promise<KualiSpecializationRaw> => {
    const cacheTags = ["kuali", "server", `specialization:${pid}`];
    return kualiFetch<KualiSpecializationRaw>(`/specializations/${pid}/latestActive`, undefined, cacheTags);
});