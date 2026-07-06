import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/shared/custom-cursor";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full max-w-full overflow-x-hidden">
        <CustomCursor />
        <Navbar />
        <main className="w-full min-w-0 max-w-full overflow-x-hidden">{children}</main>
        <Footer />
      </div>
    </>
  );
}
