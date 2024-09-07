import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ServicesContainer from "./components/ServicesContainer";
import TeamOverviewContainer from "./components/TeamOverviewContainer";
import Footer from "./components/Footer";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <main className=" bg-black text-white flex flex-col justify-center max-w-[1440px] mx-auto">
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
    </main>
    // </LayoutWrapper>
  );
}
