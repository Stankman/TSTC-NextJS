import { cache } from "react";
import { KualiOptionRaw } from "@/types/kuali";
import { kualiFetch } from "../kuali";

export const fetchKualiOptions = cache(async (id: string): Promise<KualiOptionRaw> => {
    const cacheTags = ["kuali", "server", `option:${id}`];
    return kualiFetch<KualiOptionRaw>(`/options/${id}`, undefined, cacheTags);
});