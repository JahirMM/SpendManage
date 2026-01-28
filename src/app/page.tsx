"use client";

import CallToAction from "@/src/modules/home/components/CallToAction";
import HowItWorks from "@/src/modules/home/components/HowItWorks";
import Benefits from "@/src/modules/home/components/Benefits";
import Features from "@/src/modules/home/components/Features";
import Header from "@/src/modules/home/components/Header";
import Hero from "@/src/modules/home/components/Hero";

import { supabase } from "../shared/lib/supabaseClient";
import { useEffect } from "react";

export default function Home() {
  // tan solo es una pruba rapida
  const getUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.log("ERROR al obtener la lista de usuario" + error);
      return [];
    }

    console.log("=====");
    console.log(data);
    console.log("=====");
    return data;
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Header />
      <main className="relative z-30 max-w-5xl px-4 mx-auto xl:max-w-7xl xl:px-0">
        <Hero />
        <Features />
        <HowItWorks />
        <Benefits />
        <CallToAction />
      </main>
      <div
        className="absolute top-0 w-full h-[850px]"
        style={{ background: "var(--background-gradient)" }}
      ></div>
    </>
  );
}
