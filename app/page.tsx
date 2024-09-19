import Hero from "./components/Hero";
import ServicesContainer from "./components/ServicesContainer";
import TeamOverviewContainer from "./components/TeamOverviewContainer";
import ProjectsSection from "./components/ProjectsSection";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className=" bg-black text-white flex flex-col justify-center mx-auto">
      <Hero />
      <ServicesContainer />
      <TeamOverviewContainer />
      <ProjectsSection />
      <Contact />
    </main>
  );
}
