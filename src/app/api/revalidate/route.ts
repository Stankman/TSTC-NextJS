import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    try {
        const requestBody = await request.json();
        const secret = request.headers.get("x-webhook-secret");

        if (secret !== process.env.WORDPRESS_WEBHOOK_SECRET) {
            console.error("Invalid webhook secret.");

            return NextResponse.json(
                {
                    message: "Invalid webhook secret."
                },
                {
                    status: 401
                }
            );
        }

        const { contentType, contentId } = requestBody;

        if (!contentType) {
            return NextResponse.json(
                {
                    message: "Missing content type."
                },
                {
                    status: 400
                }
            );
        }

        try {
            console.log(`Revalidating content ${contentType} ${contentId ? `(ID: ${contentId})` : ""}`);

            revalidateTag("wordpress");
            revalidateTag(contentType);

            if (contentId) {
                revalidateTag(`${contentType}-id-${contentId}`);
                revalidateTag(`${contentType}-slug-${contentId}`);
                revalidateTag(`${contentType}-all`);
            }

            revalidatePath("/", "layout");

            return NextResponse.json(
                {
                    revalidated: true,
                    message: `Revalidated ${contentType} ${contentId ? `(ID: ${contentId})` : ""} and related content`,
                    timestamp: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error("Error revalidating path:", error);

            return NextResponse.json(
                {
                    revalidated: false,
                    message: "Failed to revalidate site.",
                    error: (error as Error).message,
                    timestamp: new Date().toISOString()
                },
                {
                    status: 500
                }
            );
        }
    } catch (error) {
        console.error("Revalidation Error:", error);
        return NextResponse.json(
            {
                message: "Error revalidating content.",
                error: (error as Error).message,
                timestamp: new Date().toISOString()
            },
            {
                status: 500
            }
        );
    }
}