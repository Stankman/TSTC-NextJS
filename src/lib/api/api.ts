import querystring from "query-string";

const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000'
    : '';

class ApiError extends Error {
  constructor(message: string, public status: number, public endpoint: string) {
    super(message);
    this.name = "APIError";
  }
}

export async function apiFetch<T>(
    path: string,
    query?: Record<string, unknown>,
    tags: string[] = ["api"],
    revalidate: number = 3600
): Promise<T> {
    const url = `${baseUrl}/api${path}${query ? `?${querystring.stringify(query)}` : ""}`;
    const userAgent = "Next.js API Client";

    const response = await fetch(url, {
        headers: {
            "User-Agent": userAgent,
        },
        next: {
            tags,
            revalidate
        }
    });

    if(!response.ok) {
        throw new ApiError(
            `API request failed: ${response.statusText}`,
            response.status,
            url
        );
    }

    const data = await response.json();
    
    return data;
}