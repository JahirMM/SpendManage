"use client";

import CallToAction from "@/src/modules/home/components/CallToAction";
import HowItWorks from "@/src/modules/home/components/HowItWorks";
import Benefits from "@/src/modules/home/components/Benefits";
import Features from "@/src/modules/home/components/Features";
import Header from "@/src/modules/home/components/Header";
import Hero from "@/src/modules/home/components/Hero";

import { useUserContext } from "@/src/shared/contexts/UserContext";

export default function Home() {
  const { user, isLoading } = useUserContext();

  return (
    <>
      <Header user={user} isLoading={isLoading} />
      <main className="relative z-30 max-w-5xl px-4 mx-auto xl:max-w-7xl xl:px-0">
        <Hero user={user} isLoading={isLoading} />
        <Features />
        <HowItWorks />
        <Benefits />
        <CallToAction user={user} isLoading={isLoading} />
      </main>
      <div
        className="absolute top-0 w-full h-[850px]"
        style={{ background: "var(--background-gradient)" }}
      ></div>
    </>
  );
}
