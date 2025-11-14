import { cache } from "react";
import { getAllItems, getAllItemSlugs, getItemById, getItemBySlug, getItemsPaginated } from "../wordpress";
import { NewsArticle, Program, WordPressResponse } from "@/types/wordpress";

export const getArticlesPaginated = cache(async function getArticlesPaginated(
  page: number = 1,
  perPage: number = 9,
  filterParams?: {
    campus?: string;
    industry?: string;
    search?: string;
  }
): Promise<WordPressResponse<NewsArticle[]>> {
  return getItemsPaginated<NewsArticle>('news-article', page, perPage, filterParams);
});

export const getAllArticles = cache(async function getAllArticles(): Promise<NewsArticle[]> {
  return getAllItems<NewsArticle>('news-article');
});

export const getArticleById = cache(async function getArticleById(id: number): Promise<NewsArticle> {
  return getItemById<NewsArticle>("news-article", id);
});

export const getArticleBySlug = cache(async function getArticleBySlug(slug: string): Promise<NewsArticle> {
  return getItemBySlug<NewsArticle>("news-article", slug);
});

export const getAllArticlesSlugs = cache(async function getAllArticlesSlugs(): Promise<{ slug: string }[]> {
  return getAllItemSlugs('news-article');
});

