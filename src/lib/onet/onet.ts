import { OnetRaw } from "@/types/onet";
import { cache } from "react";

const baseUrl = process.env.ONET_API_URL;

if (!baseUrl) {
    throw new Error("ONET_API_URL environment variable is not defined.");
}

const baseToken = process.env.ONET_API_REGISTRATION_KEY;

if (!baseToken) {
    throw new Error("ONET_API_REGISTRATION_KEY environment variable is not defined.");
}

class OnetAPIError extends Error {
    constructor(message: string, public status: number, public endpoint: string) {
        super(message);
        this.name = "OnetAPIError";
    }
}

async function fetchOnet<T>(
    path: string,
    payload: Record<string, unknown>,
    tags: string[] = ["onet", "server"],
    revalidate: number = 3600
): Promise<T> {
    const url = `${baseUrl}${path}`;
    const userAgent = "Next.js ONET Client";

    const body = {
        ...payload,
        registrationKey: baseToken
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "User-Agent": userAgent,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        next: {
            tags,
            revalidate
        }
    });

    console.log(response);

    if (!response.ok) {
        throw new OnetAPIError(
            `ONET API request failed: ${response.statusText}`,
            response.status,
            url
        );
    }

    const data = await response.json();

    return data;
}

export const fetchOnetSerieById = cache(async (fullSerieId: string): Promise<OnetRaw> => {
    const cacheTags = ["onet", "server", `serie-id:${fullSerieId}`];

    const payload = {
        catalog: true,
        seriesid: [fullSerieId]
    };

    const data = await fetchOnet<OnetRaw>(`/timeseries/data/`, payload, cacheTags);

    return data;
});