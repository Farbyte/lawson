import Navbar from "./_home_components/Navbar/navbar";
import Hero from "./_home_components/Hero/hero";
import Features from "./_home_components/Features";
import Working from "./_home_components/Working";

export default function Home() {
  return (
    <main className="bg-black h-full">
      <Navbar />
      <Hero />
      <Features />
      <Working />
    </main>
  );
}
