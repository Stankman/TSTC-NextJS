import { Award } from "@/types/wordpress";
import { cache } from "react";
import { getAllItems, getItemById, getItemBySlug } from "../wordpress";

export const getAllAwards = cache(async (): Promise<Award[]> => {
  return getAllItems<Award>("award");
});

export const getAwardById = cache(async (id: number): Promise<Award> => {
  return getItemById<Award>("award", id);
});

export const getAwardBySlug = cache(async (slug: string): Promise<Award> => {
  return getItemBySlug<Award>("award", slug);
});