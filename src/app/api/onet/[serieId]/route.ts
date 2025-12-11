
import { fetchOnetSerieById } from "@/lib/onet/onet";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ serieId: string }> }
) {
  try {
    const { serieId } = await params;

    if (!/^\d+$/.test(serieId)) {
      return NextResponse.json(
        { error: 'Serie ID must be a number. The given ID is wrong.' },
        { status: 400 }
      );
    }

    if (serieId.length !== 6) {
      return NextResponse.json(
        { error: 'Serie ID must be exactly 6 digits. The given ID is wrong.' },
        { status: 400 }
      );
    }

    const fullSerieId = `OEUS4800000000000${serieId}13`;

    const serieData = await fetchOnetSerieById(fullSerieId);

    if (!serieData) {
      return NextResponse.json(
        { error: "Serie not found" },
        { status: 404 }
      );
    }

    const series = serieData.Results.series;

    if (!series || series.length === 0) {
      return NextResponse.json(
        { error: "[ONet Client]No series found" },
        { status: 404 }
      );
    }

    const serie = series[0];

    const response = {
      serieId,
      fullSerieId,
      occupation: serie.catalog.occupation,
      annualMedian: Number(serie.data[0].value.replace(/,/g, '')) || 0,
    };

    return NextResponse.json(response);
  } catch (error) { 
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}