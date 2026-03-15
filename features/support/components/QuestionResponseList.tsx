"use client";

import { useEffect, useRef } from "react";

import { AssistantMessageRow } from "./AssistantMessageRow";
import { UserMessageRow } from "./UserMessageRow";

import type { SupportMessage } from "@/features/support/types/support";

export type QuestionResponseListProps = {
  isLoading: boolean;
  messages: Array<SupportMessage>;
};

export const QuestionResponseList = ({
  isLoading,
  messages,
}: QuestionResponseListProps) => {
  const lastArticleRef = useRef<HTMLElement | null>(null);

  /**
   * Auto scroll to the last message when the user message is added
   */
  useEffect(() => {
    const lastMessage =
      messages.length > 0 ? messages[messages.length - 1] : null;

    if (lastArticleRef.current && lastMessage?.type === "user") {
      lastArticleRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="flex flex-1 flex-col overflow-auto p-5 sm:p-6 lg:p-8 pb-30!"
      data-testid="question-response-list"
      aria-busy={isLoading}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        {messages.map((msg, index) => {
          const isLast = index === messages.length - 1;
          const showLoader = isLast && isLoading;

          if (msg.type === "user") {
            return (
              <UserMessageRow
                key={msg.id}
                message={msg}
                isLast={isLast}
                showLoader={showLoader}
                articleRef={isLast ? lastArticleRef : undefined}
              />
            );
          }

          return (
            <AssistantMessageRow key={msg.id} message={msg} isLast={isLast} />
          );
        })}
      </div>
    </div>
  );
};
