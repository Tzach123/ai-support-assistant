import { SupportCategory } from "@/features/support/types/support";

export type ClassifyResult = {
  category: SupportCategory;
  response: string;
};

export const fetchClassification = async (
  text: string
): Promise<ClassifyResult> => {
  const res = await fetch("/api/classify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error ?? "Classification failed"
    );
  }
  const data: ClassifyResult = await res.json();
  return data;
};
