import { ThemeButton } from "./components/ThemeButton";

export default function Home() {
  return (
    <>
      <header
        className="sticky top-0 z-10 flex w-full items-center justify-between gap-4 bg-bg-elevated border-b border-border py-2 px-4 font-medium shadow-nav box-border sm:px-6"
        data-testid="app-header"
      >
        <h1 className="text-nav text-text">AI Support Assistant</h1>
        <ThemeButton />
      </header>
      <main>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* future content */}
        </div>
      </main>
    </>
  );
}
