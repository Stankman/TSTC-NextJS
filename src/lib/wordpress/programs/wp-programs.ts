import { cache } from "react";
import { getAllItems, getAllItemSlugs, getItemById, getItemBySlug, getItemsPaginated } from "../wordpress";
import { Program, WordPressResponse } from "@/types/wordpress";

export const getProgramsPaginated = cache(async function getProgramsPaginated(
  page: number = 1,
  perPage: number = 9,
  filterParams?: {
    campus?: string;
    industry?: string;
    search?: string;
  }
): Promise<WordPressResponse<Program[]>> {
  return getItemsPaginated<Program>('program', page, perPage, filterParams);
});

export const getAllPrograms = cache(async function getAllPrograms(): Promise<Program[]> {
  return getAllItems<Program>('program');
});

export const getProgramById = cache(async function getProgramById(id: number): Promise<Program> {
  return getItemById<Program>("program", id);
});

export const getProgramBySlug = cache(async function getProgramBySlug(slug: string): Promise<Program> {
  return getItemBySlug<Program>("program", slug);
});

export const getAllProgramsSlugs = cache(async function getAllProgramsSlugs(): Promise<{ slug: string }[]> {
  return getAllItemSlugs('program');
});

