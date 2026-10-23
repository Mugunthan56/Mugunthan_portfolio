import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";
import { motion } from "framer-motion";

const noiseSvgUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <div className="min-h-[100dvh] text-zinc-100 flex flex-col pt-12 overflow-x-hidden relative selection:bg-blue-500/30 antialiased">
      {/* Isolated Midnight Aurora Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050507] transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(30,58,138,0.25)_0%,transparent_40%),radial-gradient(circle_at_85%_60%,rgba(88,28,135,0.25)_0%,transparent_40%)] transform-gpu" />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: noiseSvgUrl, willChange: "transform" }}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-[100dvh] w-full">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Contact />
        </main>
      </div>
    </div>
  );
}
