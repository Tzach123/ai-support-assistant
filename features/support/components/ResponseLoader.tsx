"use client";

export const ResponseLoader = () => (
  <div
    className="flex items-center gap-1 py-2"
    role="status"
    aria-label="Loading response"
    data-testid="message-response-loader"
  >
    <span className="h-2 w-2 rounded-full bg-accent animate-bounce [animation-delay:-0.3s]" />
    <span className="h-2 w-2 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
    <span className="h-2 w-2 rounded-full bg-accent animate-bounce" />
  </div>
);
