import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

/** Every page except the home page (public/index.html, built with the taste-skill kit). */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
