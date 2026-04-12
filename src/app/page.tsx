import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HighlightBar from "@/components/HighlightBar";
import About from "@/components/About";
import Snapshot from "@/components/Snapshot";
import CoreModules from "@/components/CoreModules";
import Entrepreneurship from "@/components/Entrepreneurship";
import Roadmap from "@/components/Roadmap";
import Assessment from "@/components/Assessment";
import Mission from "@/components/Mission";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HighlightBar />
        <About />
        <Snapshot />
        <CoreModules />
        <Entrepreneurship />
        <Roadmap />
        <Assessment />
        <Mission />
        <Registration />
      </main>
      <Footer />
    </>
  );
}
