import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Zap, Code2 } from "lucide-react";

const outerCards = [
  { id: "tl", position: "-left-8 -top-8 w-48 transform -translate-x-1/2 -translate-y-1/2" },
  { id: "tr", position: "-right-8 -top-8 w-48 transform translate-x-1/2 -translate-y-1/2" },
  { id: "bl", position: "-left-8 -bottom-8 w-44 transform -translate-x-1/2 translate-y-1/2" },
  { id: "br", position: "-right-8 -bottom-8 w-40 transform translate-x-1/2 translate-y-1/2" }
];

export function Hero() {
  const containerRef = useRef(null);

  // Custom Orbital Physics Engine — runs unconditionally, never pauses on hover
  const angle = useMotionValue(0);

  useAnimationFrame((_time, delta) => {
    // Rotate -9 degrees per second -> 40 seconds for 360 degrees rotation
    angle.set(angle.get() - (delta / 1000) * 9);
  });

  const rotateParent = useTransform(angle, (v) => `${v}deg`);
  const rotateChild = useTransform(angle, (v) => `${-v}deg`);

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.32, 0.72, 0, 1] } }
  };

  const renderCardUI = (id) => {
    switch(id) {
      case "tl":
        return (
          <div className="w-full h-full bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl text-[10px] text-left flex flex-col gap-3 shadow-[0_22px_32px_rgba(0,0,0,0.5)]">
            <div className="flex gap-1.5 mb-1">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer"></div>
            </div>
            <div className="font-mono text-zinc-400 leading-relaxed">
               <p><span className="text-emerald-400">➜</span> ~ python train_model.py</p>
               <p className="mt-1 text-zinc-500">Initializing tensors...</p>
               <p className="text-cyan-400 mt-1">[SUCCESS] Weights optimized.</p>
            </div>
          </div>
        );
      case "tr":
        return (
          <div className="w-full h-full bg-[#0f0f11]/90 backdrop-blur-xl border border-white/10 p-5 rounded-xl text-[10px] text-left flex flex-col shadow-[0_22px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-3">
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-300 font-medium tracking-wide">Hero.jsx</span>
            </div>
            <div className="font-mono leading-loose text-zinc-400">
               <p><span className="text-purple-400">export function</span> <span className="text-yellow-200">Hero</span>() {'{'}</p>
               <p className="pl-3"><span className="text-purple-400">return</span> (</p>
               <p className="pl-6">&lt;<span className="text-cyan-400">OrbitalGraph</span> /&gt;</p>
               <p className="pl-3">)</p>
               <p>{'}'}</p>
            </div>
          </div>
        );
      case "bl":
        return (
          <div className="w-full h-full bg-zinc-950/90 backdrop-blur-md border border-white/10 p-5 rounded-xl text-[10px] text-left flex flex-col shadow-[0_22px_32px_rgba(0,0,0,0.5)]">
            <div className="text-zinc-500 font-mono mb-3 text-[9px] uppercase tracking-wider">api_response.json</div>
            <div className="font-mono text-zinc-300 leading-relaxed">
               <p>{'{'}</p>
               <p className="pl-3"><span className="text-cyan-400">"model"</span>: <span className="text-emerald-300">"gpt-4-turbo"</span>,</p>
               <p className="pl-3"><span className="text-cyan-400">"status"</span>: <span className="text-emerald-300">"active"</span>,</p>
               <p className="pl-3"><span className="text-cyan-400">"latency"</span>: <span className="text-orange-300">"12ms"</span></p>
               <p>{'}'}</p>
            </div>
          </div>
        );
      case "br":
        return (
          <div className="w-full h-full bg-white/[0.03] backdrop-blur-md border border-white/10 p-4 rounded-xl text-[10px] text-left flex flex-col gap-4 shadow-[0_22px_32px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center bg-black/20 p-2 rounded-md border border-white/5">
              <span className="text-zinc-300 font-bold uppercase tracking-wider text-[9px]">Server Metrics</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
            </div>
            <div className="grid grid-cols-7 gap-1.5 w-full">
              {[...Array(21)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-full aspect-square rounded-[2px] ${[2, 5, 8, 12, 14, 15, 17, 19].includes(i) ? 'bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'bg-white/[0.08]'}`} 
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full z-10 overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full min-h-[60vh] overflow-visible">
        
        {/* Left Column: Massive Typography & Action */}
        <div className="flex flex-col gap-4 w-full z-20 relative max-w-full lg:pr-8">
          <motion.h1 
            initial="hidden" 
            animate="visible" 
            transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
            className="flex flex-col gap-2 max-w-full"
          >
            <motion.span 
              variants={titleVariants} 
              className="block pb-2 pr-4 text-6xl md:text-[5.5rem] font-extrabold tracking-tighter uppercase bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent leading-[1.15] overflow-visible whitespace-nowrap transform-gpu [backface-visibility:hidden] [-webkit-font-smoothing:antialiased] will-change-transform"
            >
              MUGUNTHAN
            </motion.span>
            <motion.span variants={titleVariants} className="block text-2xl md:text-4xl font-light text-zinc-300">Software Engineer &</motion.span>
            <motion.span variants={titleVariants} className="block text-2xl md:text-4xl font-light text-zinc-300">AI Enthusiast</motion.span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col gap-8 mt-4 lg:mt-8"
          >
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light max-w-2xl">
              I build robust, scalable applications and integrate intelligent AI solutions, bridging the gap between complex backend systems and seamless, high-performance user experiences.
            </p>
            
            {/* CTA and Social Links Layout */}
            <div className="flex items-center gap-5">
              <a href="#projects" className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors duration-500 rounded-full p-2 pl-8 border border-white/10 w-max active:scale-[0.98]">
                <span className="text-sm font-medium tracking-wide uppercase text-white/90">View Projects</span>
                <div className="w-12 h-12 rounded-full bg-[#050505] group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                   <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
                </div>
              </a>
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/Mugunthan56" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 text-zinc-400 hover:bg-zinc-200 hover:text-black hover:border-zinc-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/mugunthan30" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 text-zinc-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Orbital Mechanics Node Graph */}
        <div
          className="relative w-full min-h-[500px] h-[500px] lg:h-[600px] mt-12 lg:mt-0 flex items-center justify-center lg:translate-x-12 lg:justify-self-end overflow-visible"
        >
          
          {/* Mobile scaling wrapper — shrinks orbital graph to fit smaller viewports */}
          <div className="relative w-full overflow-x-clip overflow-y-visible flex items-center justify-center py-6 sm:py-10 md:overflow-visible md:py-0">
            <div className="scale-[0.65] xs:scale-[0.72] min-[400px]:scale-[0.72] sm:scale-90 md:scale-100 origin-center transition-transform duration-300 transform-gpu">

          {/* Static Center Node (Hub) */}
          <div className="absolute z-20 pointer-events-auto" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
             <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  scale: { duration: 0.8, delay: 0.8 },
                  opacity: { duration: 0.8, delay: 0.8 }
                }}
                className="w-full h-full bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-crosshair"
             >
               <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
                  <motion.div
                    animate={{ filter: ["drop-shadow(0px 0px 2px rgba(251,191,36,0))", "drop-shadow(0px 0px 18px rgba(251,191,36,0.9))", "drop-shadow(0px 0px 2px rgba(251,191,36,0))"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap className="w-7 h-7 text-yellow-400" />
                  </motion.div>
               </div>
               <span className="text-[12px] font-bold text-white tracking-[0.2em] uppercase whitespace-nowrap">System Core</span>
             </motion.div>
          </div>

          {/* Orbital Parent Wrapper — pointer-events-none so orbit ring never captures hover */}
          <motion.div
            className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] border border-white/10 rounded-full border-dashed pointer-events-none"
            style={{ rotate: rotateParent }}
          >
            {/* Iterative Orbiting Children */}
            {outerCards.map((card, index) => (
               <div key={card.id} className={`absolute ${card.position}`}>
                 <motion.div
                   style={{ rotate: rotateChild }}
                   className="w-full h-auto transform-gpu origin-center pointer-events-none"
                 >
                    {/* pointer-events-auto re-enables hover scale on individual cards */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1 + (index * 0.15) }}
                      className="pointer-events-auto cursor-crosshair"
                      whileHover={{
                         scale: 1.08,
                         zIndex: 50,
                         transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                    >
                      {renderCardUI(card.id)}
                    </motion.div>
                 </motion.div>
               </div>
            ))}
          </motion.div>

            </div>{/* end scale wrapper */}
          </div>{/* end overflow wrapper */}
          
        </div>
      </div>
    </section>
  );
}
