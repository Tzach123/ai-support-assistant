import type {
  SupportAssistantMessage,
  SupportCategory,
  SupportUserMessage,
} from "@/features/support/types/support";

const generateId = (): string => crypto.randomUUID();

export const createUserMessage = (question: string): SupportUserMessage => ({
  id: generateId(),
  type: "user",
  question: question.trim(),
});

export const createAssistantMessage = (
  category: SupportCategory,
  answer: string
): SupportAssistantMessage => ({
  id: generateId(),
  type: "assistant",
  response: { category, answer },
  error: null,
});

export const createAssistantErrorMessage = (
  error: string
): SupportAssistantMessage => ({
  id: generateId(),
  type: "assistant",
  response: null,
  error,
});
