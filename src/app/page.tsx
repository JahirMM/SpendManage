import Features from "@/src/home/components/Features";
import Header from "@/src/home/components/Header";
import Hero from "@/src/home/components/Hero";
import HowItWorks from "../home/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative z-30 max-w-5xl px-4 mx-auto xl:max-w-7xl xl:px-0">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <div
        className="absolute top-0 w-full h-[850px]"
        style={{ background: "var(--background-gradient)" }}
      ></div>
    </>
  );
}
