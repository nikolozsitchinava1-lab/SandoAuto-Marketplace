import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-cream-gray">
      <Navbar />
      <main
        id="main-content"
        aria-label="SandoAuto"
        className="min-h-0 flex-1"
      />
      <Footer />
    </div>
  );
}
