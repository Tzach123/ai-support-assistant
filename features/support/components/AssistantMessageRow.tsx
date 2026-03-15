"use client";

import type { SupportAssistantMessage } from "@/features/support/types/support";
import { LAST_MESSAGE_OFFSET_PX } from "@/features/support/utils";

export type AssistantMessageRowProps = {
  message: SupportAssistantMessage;
  isLast: boolean;
};

export const AssistantMessageRow = ({
  message,
  isLast,
}: AssistantMessageRowProps) => {
  const { response, error } = message;

  return (
    <article
      className="flex flex-col border-b border-border last:border-b-0 last:pb-0"
      data-testid="message-row-assistant"
    >
      <div
        style={{
          minHeight: isLast
            ? `calc(-${LAST_MESSAGE_OFFSET_PX}px + 100dvh)`
            : undefined,
        }}
        className="break-words text-sm text-text-muted py-5"
        data-testid="message-response"
        aria-live="polite"
      >
        {response !== null ? (
          <p>
            <span
              className="inline-flex rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold tracking-wide text-accent"
              data-testid="message-category"
            >
              {response.category}
            </span>{" "}
            {response.answer}
          </p>
        ) : error !== null ? (
          <span
            className="inline-flex w-fit rounded-full bg-error-bg px-3 py-1.5 text-sm font-medium text-error-text"
            data-testid="message-error"
          >
            {error}
          </span>
        ) : null}
      </div>
    </article>
  );
};
