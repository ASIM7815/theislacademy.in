import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HighlightBar from "@/components/HighlightBar";
import About from "@/components/About";
import CoreModules from "@/components/CoreModules";
import HowDifferent from "@/components/HowDifferent";
import Entrepreneurship from "@/components/Entrepreneurship";
import Roadmap from "@/components/Roadmap";
import Assessment from "@/components/Assessment";
import Registration from "@/components/Registration";
import Location from "@/components/Location";
import MissionStatement from "@/components/MissionStatement";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HighlightBar />
        <About />
        <CoreModules />
        <HowDifferent />
        <Entrepreneurship />
        <Roadmap />
        <Assessment />
        <MissionStatement />
        <Registration />
        <Location />
      </main>
      <Footer />
    </>
  );
}
