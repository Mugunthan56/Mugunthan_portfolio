import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="pt-24 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto w-full z-10 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        className="flex flex-col w-full bg-[#050505]/40 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl p-8 md:p-12"
      >
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-50 uppercase">
              LETS CONNECT
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/Mugunthan56" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/mugunthan-s56" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com/Mugunthan000" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="mailto:mugunthans644@gmail.com" className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-zinc-800/80 mb-8" />

        {/* Bottom Footer Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-xs md:text-sm text-zinc-500 font-light">
          <div className="text-center lg:text-left tracking-wide">
            MUGUNTHAN's Portfolio 2026 • Crafted with REACT JS & TAILWIND
          </div>
          
          <div className="flex items-center gap-6">
            <span className="tracking-wide">Designed and Developed by Mugunthan</span>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-all group shrink-0"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
