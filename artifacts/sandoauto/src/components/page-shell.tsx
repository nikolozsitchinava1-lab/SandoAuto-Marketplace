import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-[100dvh] flex-col bg-cream-gray"><Navbar /><main id="main-content" className="min-h-0 flex-1">{children}</main><Footer /></div>;
}
