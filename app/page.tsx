"use client";

import { useState } from "react";
import { InfoIcon } from "../components/icons/InfoIcon";
import { ThemeButton } from "../components/ThemeButton";
import {
  QuestionResponseList,
  SearchInput,
  WelcomeSection,
} from "@/features/support/components";
import type { SupportMessage } from "@/features/support/types";

const mockSupportResponse = async (question: string): Promise<string> => {
  await new Promise((r) => setTimeout(r, 800));
  return `This is a mock response for: "${question}". Replace this with a real API call.`;
};

export default function Home() {
  const [messages, setMessages] = useState<Array<SupportMessage>>([]);

  const handleSupportSubmit = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const id = crypto.randomUUID();
    const newMessage: SupportMessage = {
      id,
      question: trimmed,
      response: null,
      isLoading: true,
    };
    setMessages((prev) => [...prev, newMessage]);

    const responseText = await mockSupportResponse(trimmed);
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, response: responseText, isLoading: false } : m
      )
    );
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
          <QuestionResponseList messages={messages} />
        )}
        <div className="absolute bottom-8 left-1/2 w-full max-w-3xl -translate-x-1/2 px-4 sm:px-6 lg:px-8">
          <SearchInput onSubmit={handleSupportSubmit} />
        </div>
      </main>
    </div>
  );
}
