"use client";

import { useState } from "react";

import { fetchClassification } from "@/features/support/api";
import {
  createAssistantErrorMessage,
  createAssistantMessage,
  createUserMessage,
} from "@/features/support/utils";
import {
  QuestionResponseList,
  SearchInput,
  WelcomeSection,
} from "@/features/support/components";
import { InfoIcon } from "@/components/icons/InfoIcon";
import { ThemeButton } from "@/components/ThemeButton";

import type { SupportMessage } from "@/features/support/types/support";

export default function Home() {
  const [messages, setMessages] = useState<Array<SupportMessage>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSupportSubmit = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, createUserMessage(trimmed)]);
    setIsLoading(true);

    try {
      const { category, response: answer } = await fetchClassification(trimmed);
      setMessages((prev) => [...prev, createAssistantMessage(category, answer)]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      setMessages((prev) => [
        ...prev,
        createAssistantErrorMessage(errorMessage),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header
        className="z-10 flex shrink-0 items-center justify-between gap-4 border-b border-border bg-bg-elevated px-4 py-2 font-medium shadow-nav sm:px-6"
        data-testid="app-header"
      >
        <div className="flex items-center gap-2">
          <InfoIcon className="h-6 w-6 shrink-0 text-accent" />
          <h1 className="text-nav text-text">AI Support Assistant</h1>
        </div>
        <ThemeButton />
      </header>
      <main className="relative flex min-h-0 flex-1 flex-col overflow-auto">
        {showWelcome ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 sm:p-6 lg:p-8">
            <WelcomeSection />
          </div>
        ) : (
          <QuestionResponseList isLoading={isLoading} messages={messages} />
        )}
        <div className="absolute bottom-8 left-1/2 w-full max-w-3xl -translate-x-1/2 px-4 sm:px-6 lg:px-8">
          <SearchInput onSubmit={handleSupportSubmit} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
