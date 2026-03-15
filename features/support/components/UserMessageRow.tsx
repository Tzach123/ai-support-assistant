"use client";

import type { RefObject } from "react";

import { ResponseLoader } from "./ResponseLoader";

import type { SupportUserMessage } from "@/features/support/types/support";
import { LAST_MESSAGE_OFFSET_PX } from "@/features/support/utils";

export type UserMessageRowProps = {
  message: SupportUserMessage;
  isLast: boolean;
  showLoader: boolean;
  articleRef?: RefObject<HTMLElement | null>;
};

export const UserMessageRow = ({
  message,
  isLast,
  showLoader,
  articleRef,
}: UserMessageRowProps) => (
  <article
    ref={articleRef}
    className="flex flex-col pt-5 last:border-b-0 last:pb-0"
    data-testid="message-row-user"
  >
    <span
      className="max-w-full wrap-break-word rounded-xl bg-bg-elevated px-3 py-1.5 text-sm font-medium text-text"
      data-testid="message-question"
    >
      {message.question}
    </span>
    {showLoader ? (
      <div
        style={{
          minHeight: isLast
            ? `calc(-${LAST_MESSAGE_OFFSET_PX}px + 100dvh)`
            : undefined,
        }}
        className="py-3 text-sm text-text-muted"
        data-testid="message-response"
      >
        <ResponseLoader />
      </div>
    ) : null}
  </article>
);
