import { SignInButton, UserButton } from "@clerk/nextjs";
import Navbar from "./_home_components/Navbar/navbar";
import Hero from "./_home_components/Hero/hero";

export default function Home() {
  return (
    <main className="bg-black h-full">
      <Navbar />
      <Hero />
    </main>
  );
}
