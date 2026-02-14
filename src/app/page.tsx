"use client";

import { useImagePreloader } from "@/hooks/useImagePreloader";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/ui/Navbar";
import HeroScroll from "@/components/HeroScroll";
import Features from "@/components/Features";
import PlaneMorph from "@/components/PlaneMorph";
import GlobeSection from "@/components/GlobeSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const seq1 = useImagePreloader("/sequence-1", 120);
  const seq2 = useImagePreloader("/sequence-2", 120);

  const totalProgress = (seq1.progress + seq2.progress) / 2;
  const allLoaded = seq1.isLoaded && seq2.isLoaded;

  return (
    <>
      <LoadingScreen progress={totalProgress} isLoaded={allLoaded} />
      <Navbar />
      <main>
        <HeroScroll images={seq1.images} />
        <PlaneMorph images={seq2.images} />
        <Features />
        <GlobeSection />
      </main>
      <Footer />
    </>
  );
}
