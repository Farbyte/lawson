import { SignInButton, UserButton } from "@clerk/nextjs";
import Navbar from "./_home_components/navbar";

export default function Home() {
  return (
    <main className="bg-black h-[100vh]">
      <Navbar />
    </main>
  );
}
