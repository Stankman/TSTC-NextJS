import { WordPressResponse } from "@/types/wordpress";
import querystring from "query-string";

const baseUrl = process.env.WORDPRESS_URL;

if (!baseUrl) {
  throw new Error("WORDPRESS_URL environment variable is not defined");
}

class WordPressAPIError extends Error {
  constructor(message: string, public status: number, public endpoint: string) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

async function wordpressFetch<T>(
  path: string,
  query?: Record<string, unknown>,
  tags: string[] = ["wordpress"],
  revalidate: number = 3600
): Promise<T> {
  const url = `${baseUrl}${path}${query ? `?${querystring.stringify(query)}` : ""}`;
  const userAgent = "Next.js WordPress Client";

  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
    },
    next: {
      tags,
      revalidate
    },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url
    );
  }

  const data = await response.json();

  return data;
}

async function wordpressFetchWithPagination<T>(
  path: string,
  query?: Record<string, unknown>,
  tags: string[] = ["wordpress"],
  revalidate: number = 3600
): Promise<WordPressResponse<T>> {
  const url = `${baseUrl}${path}${query ? `?${querystring.stringify(query)}` : ""}`;
  const userAgent = "Next.js WordPress Client";

  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
    },
    next: {
      tags,
      revalidate,
    },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url
    );
  }

  const data = await response.json();

  const result = {
    data,
    headers: {
      totalResults: parseInt(response.headers.get("X-WP-Total") || "0", 10),
      totalPages: parseInt(response.headers.get("X-WP-TotalPages") || "0", 10),
    },
  };

  return result;
}

export async function getAllItems<T>(
  postTypeSlug: string,
  filterParams?: Record<string, unknown>
): Promise<T[]> {
  const query: Record<string, unknown> = {
    _embed: true,
    per_page: 100,
  };

  const cacheTags = ["wordpress", postTypeSlug, `${postTypeSlug}-all`];

  if (filterParams) {
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) {
        query[key] = value;
        cacheTags.push(`${postTypeSlug}-${key}-${value}`);
      }
    });
  }

  return wordpressFetch<T[]>(`/wp-json/wp/v2/${postTypeSlug}`, query, cacheTags);
}

export async function getAllItemSlugs(postTypeSlug: string): Promise<{ slug: string }[]> {
  const allSlugs: { slug: string }[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const cacheTags = ["wordpress", postTypeSlug, `${postTypeSlug}-slugs`, `${postTypeSlug}-page-${page}`];
  const response = await wordpressFetchWithPagination<Array<{ slug: string }>>(
      `/wp-json/wp/v2/${postTypeSlug}`,
      {
        per_page: 100,
        page,
        _fields: "slug",
      },
      cacheTags
    );

    const items = response.data;
  allSlugs.push(...items.map((item: { slug: string }) => ({ slug: item.slug })));

    hasMore = page < response.headers.totalPages;
    page++;
  }

  return allSlugs;
}

export async function getItemsPaginated<T>(
  postTypeSlug: string,
  page: number = 1,
  perPage: number = 9,
  filterParams?: Record<string, unknown>
): Promise<WordPressResponse<T[]>> {
  const query: Record<string, unknown> = {
    _embed: true,
    per_page: perPage,
    page,
  };

  const cacheTags = ["wordpress", postTypeSlug];

  if (filterParams) {
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) {
        query[key] = value;
        cacheTags.push(`${postTypeSlug}-${key}-${value}`);
      }
    });
  }

  cacheTags.push(`${postTypeSlug}-page-${page}`);

  return wordpressFetchWithPagination<T[]>(`/wp-json/wp/v2/${postTypeSlug}`, query, cacheTags);
}

export async function getItemById<T>(postTypeSlug: string, id: number): Promise<T> {
  const cacheTags = ["wordpress", postTypeSlug, `${postTypeSlug}-id-${id}`];
  return wordpressFetch<T>(`/wp-json/wp/v2/${postTypeSlug}/${id}`, undefined, cacheTags);
}

export async function getItemBySlug<T>(postTypeSlug: string, slug: string): Promise<T> {
  const cacheTags = ["wordpress", postTypeSlug, `${postTypeSlug}-slug-${slug}`];
  return await wordpressFetch<T[]>(`/wp-json/wp/v2/${postTypeSlug}`, { slug }, cacheTags).then(
    (items) => items[0]
  );
}

export async function searchItems<T>(postTypeSlug: string, query: string): Promise<T> {
  const cacheTags = ["wordpress", postTypeSlug, `${postTypeSlug}-search-${query}`];
  return wordpressFetch<T>(`/wp-json/wp/v2/${postTypeSlug}`, {
    search: query,
    per_page: 100, 
  }, cacheTags, 60);
}

export { WordPressAPIError };