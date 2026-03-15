import { NextRequest, NextResponse } from "next/server";

import { classify } from "@/lib/classify";
import { getResponseForCategory } from "@/lib/supportResponses";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 500;

type ClassifyRequestBody = {
  text: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as ClassifyRequestBody;
    const text = typeof body?.text === "string" ? body.text.trim() : "";

    if (!text) {
      return NextResponse.json(
        { error: "Missing or invalid 'text' in request body" },
        { status: 400 }
      );
    }

    if (text.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` },
        { status: 400 }
      );
    }

    const category = await classify(text);
    const response = getResponseForCategory(category);

    return NextResponse.json({ category, response });
  } catch (error) {
    console.error("[api/classify]", error);
    return NextResponse.json(
      { error: "Classification failed" },
      { status: 500 }
    );
  }
};
