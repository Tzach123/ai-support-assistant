export enum SupportCategory {
  BILLING = "Billing",
  TECHNICAL = "Technical",
  GENERAL = "General",
}

type MessageType = "user" | "assistant";

export interface SupportMessageBase {
  id: string;
  type: MessageType;
}

export interface SupportUserMessage extends SupportMessageBase {
  type: "user";
  question: string;
}

interface SupportAssistantMessageResponse {
  category: SupportCategory | null;
  answer: string | null;
}
export interface SupportAssistantMessage extends SupportMessageBase {
  type: "assistant";
  response: SupportAssistantMessageResponse | null;
  error: string | null;
}

export type SupportMessage = SupportUserMessage | SupportAssistantMessage;
