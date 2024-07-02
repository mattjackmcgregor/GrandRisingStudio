import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ServicesContainer from "./components/ServicesContainer";
import { CarouselProvider } from "../context/CarouselContext";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <CarouselProvider>
        <Navbar />
        <Hero />
        <ServicesContainer />
      </CarouselProvider>
    </main>
  );
}
