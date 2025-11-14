import { Campus } from "@/types/wordpress";
import { cache } from "react";
import { getAllItems, getItemById, getItemBySlug, searchItems } from "../wordpress";

export const getAllCampuses = cache(async (): Promise<Campus[]> => {
  return getAllItems<Campus>('campus');
});

export const getCampusById = cache(async (id: number): Promise<Campus> => {
  return getItemById<Campus>("campus", id);
});

export const getCampusBySlug = cache(async (slug: string): Promise<Campus> => {
  return getItemBySlug<Campus>("campus", slug);
});

export const searchCampuses = cache(async (query: string): Promise<Campus[]> => {
  return searchItems<Campus[]>("/wp-json/wp/v2/campuses", query);
});

export const getCampusByCode = cache(async (code: string): Promise<Campus | null> => {
  const campuses = await getAllItems<Campus>('campus', { code })
  
  return campuses.length > 0 ? campuses[0] : null;
});