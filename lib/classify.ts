import { SupportCategory } from "@/features/support/types/support";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const VALID_CATEGORIES = new Set<string>(Object.values(SupportCategory));

const parseCategory = (raw: string): SupportCategory => {
  const normalized = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();

  if (VALID_CATEGORIES.has(normalized)) {
    return normalized as SupportCategory;
  }

  return SupportCategory.GENERAL;
};

export const classify = async (message: string): Promise<SupportCategory> => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
Classify the support request into one category:
Billing, Technical, General.
Return ONLY the category.
`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  const content = response.choices[0]?.message?.content?.trim() ?? "";
  return parseCategory(content);
};
