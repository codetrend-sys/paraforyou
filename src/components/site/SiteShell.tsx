import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-28 md:pt-32">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
