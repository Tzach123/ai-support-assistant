"use client";

import { useEffect, useRef } from "react";
import type { SupportMessage } from "@/features/support/types";
import { ResponseLoader } from "./";

export type QuestionResponseListProps = {
  messages: Array<SupportMessage>;
};

export const QuestionResponseList = ({
  messages,
}: QuestionResponseListProps) => {
  const hasLoading = messages.some((m) => m.isLoading);

  const lastArticleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (lastArticleRef.current) {
      lastArticleRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="flex flex-1 flex-col overflow-auto p-4 sm:p-6 lg:p-8 pb-30!"
      data-testid="question-response-list"
      aria-busy={hasLoading}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {messages.map((msg, index) => (
          <article
            key={msg.id}
            ref={index === messages.length - 1 ? lastArticleRef : undefined}
            className="flex flex-col border-b border-border py-3 pb-4 last:border-b-0 last:pb-0"
            data-testid="message-row"
          >
            <span
              className="inline-flex w-fit rounded-full bg-bg-elevated px-3 py-1.5 text-sm font-medium text-text"
              data-testid="message-question"
            >
              {msg.question}
            </span>
            <div
              style={{
                minHeight:
                  index === messages.length - 1
                    ? `calc(-170px + 100dvh)`
                    : undefined,
              }}
              className={"text-sm text-text-muted py-3"}
              data-testid="message-response"
              aria-live="polite"
            >
              {msg.isLoading ? (
                <ResponseLoader />
              ) : msg.response !== null ? (
                msg.response
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
