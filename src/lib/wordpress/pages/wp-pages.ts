import { cache } from "react";
import { getItemById, getItemBySlug } from "../wordpress";
import { Page } from "@/types/wordpress";

export const getPageById = cache(async function getPageById(id: number): Promise<Page> {
    return getItemById("pages", id);
});

export const getPageBySlug = cache(async function getPageBySlug(slug: string): Promise<Page> {
    return getItemBySlug("pages", slug);
});