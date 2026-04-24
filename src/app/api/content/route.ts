import { NextResponse } from "next/server";
import { getBranchContentFromGoogleSheet } from "@/utils/googleSheetContent";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const branch = searchParams.get("branch") || "global";


  const content = await getBranchContentFromGoogleSheet(branch);
  

  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
