import React, { useState } from "react";
import { motion } from "framer-motion";


const glowColors = ["rgba(6,182,212,0.14)","rgba(245,158,11,0.12)","rgba(99,102,241,0.15)","rgba(16,185,129,0.14)"];

function CertCard({ cert, idx }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });
  const glowColor = glowColors[idx] || "rgba(255,255,255,0.1)";
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#08080a] p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-white/[0.18] hover:-translate-y-1 shadow-2xl min-h-[190px] sm:min-h-[220px] flex flex-col justify-between"
      style={{ "--glow-color": glowColor }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid line backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
      {/* Radial glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, var(--glow-color), transparent 70%)`,
        }}
      />
      {/* Artwork layer */}
      <div className="absolute inset-y-0 right-0 w-2/3 pointer-events-none overflow-hidden opacity-35 group-hover:opacity-75 transition-opacity duration-500">
        {idx === 0 && (
          <div className="relative w-full h-full">
            {/* Orbital rings */}
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
              <circle cx="100" cy="100" r="50" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
            </svg>
            {/* Orbiting node */}
            <motion.div
              className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              style={{ top: "calc(50% - 5px)", left: "calc(50% - 5px)", transformOrigin: "0 80px" }}
            />
          </div>
        )}
        {idx === 1 && (
          <div className="flex flex-col space-y-3 p-2">
            {["bg-blue-400", "bg-amber-400", "bg-emerald-400"].map((color, i) => (
              <motion.div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 flex items-center gap-2"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.3, ease: "easeInOut" }}
              >
                <span className={`${color} w-2 h-2 rounded-full`}></span>
                <span className="flex-1 h-1 bg-white/20 rounded"></span>
              </motion.div>
            ))}
          </div>
        )}
        {idx === 2 && (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="w-3/4 h-3/4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="60" cy="60" rx="50" ry="30" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
              <ellipse cx="60" cy="60" rx="35" ry="20" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
            </svg>
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-violet-400 shadow-[0_0_12px_#8b5cf6]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            />
          </div>
        )}
        {idx === 3 && (
          <div className="flex flex-col h-full justify-between p-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-12 bg-white/10 rounded mx-auto"
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
            {/* Trend wave */}
            <svg viewBox="0 0 100 30" className="w-full h-8 mt-2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 15 Q25 0 50 15 T100 15" stroke="rgba(16,185,129,0.6)" strokeWidth="2" fill="none" />
              <motion.circle
                cx="50"
                cy="15"
                r="3"
                fill="rgba(16,185,129,0.9)"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>
        )}
      </div>
      {/* Text content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
          {cert.title}
        </h3>
        <div className="flex items-center justify-between gap-4 w-full mt-auto pt-8 relative z-10">
          <span className="text-xs sm:text-sm md:text-base font-medium tracking-[0.14em] text-zinc-400 uppercase">
            {cert.issuer.toUpperCase()}
          </span>
          <span className="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-xs sm:text-sm font-mono text-zinc-200 tracking-wider transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.08]">
            {cert.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
}


const certificates = [
  { title: "Cloud Computing", issuer: "Elite Silver Grade", date: "NPTEL" },
  { title: "Java certification", issuer: "Java Software Trainee", date: "INFOSYS" },
  { title: "Web Development", issuer: "Advanced React Patterns", date: "CODSOFT" },
  { title: "Power BI", issuer: "Analyst", date: "PANTECH" }
];

export function Certificates() {
  return (
    <section id="certificates" className="py-24 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto w-full z-10 relative">
      <div className="flex flex-col gap-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-zinc-50">
            Certifications
          </h2>
        </motion.div>
        
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 w-full max-w-5xl mx-auto">
          {certificates.map((cert, idx) => (
            <CertCard key={idx} cert={cert} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
