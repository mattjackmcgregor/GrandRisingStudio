import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ServicesContainer from "./components/ServicesContainer";
import { CarouselProvider } from "../context/CarouselContext";
import TeamOverviewContainer from "./components/TeamOverviewContainer";
import Footer from "./components/Footer";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <CarouselProvider>
        <Navbar />
        <Hero />
        <ServicesContainer />
        <TeamOverviewContainer />
        <ProjectsSection />
        <Footer />
        <Footer />
        <Footer />
        <Footer />
        <Footer />
        <Footer />
      </CarouselProvider>
    </main>
  );
}
