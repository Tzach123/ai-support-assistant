import { SupportCategory } from "@/features/support/types/support";

/**
 * Returns the appropriate support response text for a given category.
 * Used by the backend only; responses are defined here so they stay server-side.
 */
const CATEGORY_RESPONSES: Record<SupportCategory, string> = {
  [SupportCategory.BILLING]: "Please contact billing support.",
  [SupportCategory.TECHNICAL]: "Please contact technical support.",
  [SupportCategory.GENERAL]: "Please contact general support.",
};

export function getResponseForCategory(category: SupportCategory): string {
  return (
    CATEGORY_RESPONSES[category] ?? CATEGORY_RESPONSES[SupportCategory.GENERAL]
  );
}
