"use client";

import { InfoIcon } from "@/components/icons/InfoIcon";

export const WelcomeSection = () => {
  return (
    <section
      className="flex flex-col items-center gap-4 px-4 py-4 text-center"
      data-testid="welcome-section"
    >
      <div className="flex flex-col items-center gap-2">
        <InfoIcon className="h-12 w-12 shrink-0 text-accent" />
        <h2 className="text-xl font-semibold text-text sm:text-2xl">
          How can I help you today?
        </h2>
        <p className="max-w-md text-sm text-text-muted">
          Describe your issue and I&apos;ll route you to the right support team
          — billing, technical, or general inquiries.
        </p>
      </div>
    </section>
  );
};
