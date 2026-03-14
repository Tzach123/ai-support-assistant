"use client";

import { useId, useState } from "react";
import { SendIcon } from "@/components/icons/SendIcon";

export type SearchInputProps = {
  /** Called with the message when the form is submitted */
  onSubmit: (message: string) => void;
};

export const SearchInput = ({ onSubmit }: SearchInputProps) => {
  const textareaId = useId();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) form.requestSubmit();
    }
  };

  const isSubmitDisabled = !value.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-[90%] max-w-4xl items-end gap-2 rounded-xl border border-border bg-bg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-border-focus focus-within:ring-offset-2 focus-within:ring-offset-bg"
      data-testid="search-input"
    >
      <label htmlFor={textareaId} className="sr-only">
        Search or message
      </label>
      <textarea
        id={textareaId}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        rows={1}
        aria-label="Search or message"
        className="min-h-[44px] flex-1 resize-none bg-transparent py-2.5 text-text placeholder:text-text-muted focus:outline-none"
        data-testid="search-input-field"
      />
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="shrink-0 rounded p-2 text-text transition-colors duration-fast ease-default hover:bg-bg-elevated focus:outline-none focus:ring-2 focus:ring-border-focus disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Send message"
        data-testid="search-input-submit"
      >
        <SendIcon className="h-5 w-5" />
      </button>
    </form>
  );
};
