import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ programSlug: string }> }
) {
    try {
        const { programSlug } = await params;

    } catch(error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
    
        if (/404/.test(errorMessage)) {
            return NextResponse.json({ error: "[WP Client] Program not found" }, { status: 404 });
        }

            return NextResponse.json({ error: "[WP Client] Internal server error" }, { status: 500 });
    }


    return NextResponse.json(
        {
            message: "Ready"
        },
        {
            status: 200
        }
    );
}