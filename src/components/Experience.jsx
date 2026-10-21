import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ExternalLink } from "lucide-react";

const NovaVisual = () => (
  <svg viewBox="0 0 400 300" className="absolute top-1/4 -right-10 w-[120%] h-auto opacity-20 group-hover:opacity-50 transition-opacity duration-700 ease-in-out pointer-events-none z-0">
    <path fill="url(#gradientNova)" d="M0 150 C 50 100, 100 200, 200 120 C 300 40, 350 180, 400 150 L 400 300 L 0 300 Z" />
    <path fill="none" stroke="rgba(99,102,241,0.8)" strokeWidth="2" d="M0 150 C 50 100, 100 200, 200 120 C 300 40, 350 180, 400 150" className="transition-all duration-700 group-hover:stroke-indigo-400" />
    <defs>
      <linearGradient id="gradientNova" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
  </svg>
);

const AuraVisual = () => (
  <div className="absolute top-1/4 right-8 w-64 h-48 bg-obsidian border border-zinc-800/80 rounded-lg shadow-[0_0_40px_rgba(6,182,212,0.1)] p-4 overflow-hidden rotate-[8deg] opacity-40 group-hover:opacity-80 group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0">
    <div className="flex gap-1.5 mb-4 border-b border-zinc-800 pb-2">
      <div className="w-2 h-2 rounded-full bg-zinc-700" />
      <div className="w-2 h-2 rounded-full bg-zinc-700" />
      <div className="w-2 h-2 rounded-full bg-zinc-700" />
    </div>
    <div className="flex flex-col gap-2.5">
      <div className="w-full h-1 bg-cyan-500/20 rounded group-hover:bg-cyan-500/40 transition-colors" />
      <div className="w-3/4 h-1 bg-cyan-500/30 rounded group-hover:bg-cyan-400/50 transition-colors" />
      <div className="w-1/2 h-1 bg-emerald-500/20 rounded group-hover:bg-emerald-400/40 transition-colors" />
      <div className="w-full h-1 bg-zinc-800 rounded mt-3" />
      <div className="w-4/5 h-1 bg-zinc-800 rounded" />
    </div>
  </div>
);

const FluxVisual = () => (
  <div className="absolute -bottom-4 -right-10 w-80 h-80 flex gap-4 opacity-20 group-hover:opacity-60 transition-opacity duration-700 ease-out pointer-events-none z-0">
    <div className="flex flex-col gap-4 flex-1 translate-y-12 group-hover:translate-y-8 transition-transform duration-700">
      <div className="w-full h-24 bg-zinc-800/40 rounded-xl border border-zinc-700/50" />
      <div className="w-full h-40 bg-emerald-500/10 rounded-xl border border-emerald-500/20" />
    </div>
    <div className="flex flex-col gap-4 flex-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
      <div className="w-full h-32 bg-emerald-400/10 rounded-xl border border-emerald-400/20" />
      <div className="w-full h-24 bg-zinc-800/40 rounded-xl border border-zinc-700/50" />
    </div>
  </div>
);

const OrbitVisual = () => (
  <svg viewBox="0 0 500 300" className="absolute -top-10 -right-10 w-[110%] h-auto opacity-30 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 ease-[0.16,1,0.3,1] z-0 pointer-events-none">
    <line x1="100" y1="100" x2="300" y2="150" strokeWidth="1" className="stroke-zinc-700"/>
    <line x1="300" y1="150" x2="200" y2="250" strokeWidth="1" className="stroke-indigo-800 group-hover:stroke-indigo-500 transition-colors duration-700"/>
    <line x1="300" y1="150" x2="450" y2="200" strokeWidth="1" className="stroke-pink-800 group-hover:stroke-pink-500 transition-colors duration-700"/>
    
    <circle cx="100" cy="100" r="10" fill="rgba(147,51,234,0.6)" className="animate-pulse" />
    <circle cx="300" cy="150" r="15" fill="rgba(236,72,153,0.6)" className="transition-all duration-700 group-hover:fill-pink-500" />
    <circle cx="200" cy="250" r="8" fill="rgba(99,102,241,0.6)" className="transition-all duration-700 group-hover:fill-indigo-400" />
    <circle cx="450" cy="200" r="12" fill="rgba(236,72,153,0.4)" />
    
    <circle cx="300" cy="150" r="40" fill="none" stroke="rgba(236,72,153,0.2)" strokeWidth="1" className="animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
  </svg>
);


function TiltCard({ children, className = "", hoverHex = "100,100,100", visual }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Rigid fluid spring matching Taste guides
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["3deg", "-3deg"]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-3deg", "3deg"]), { stiffness: 120, damping: 18 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    x.set(mx / rect.width - 0.5);
    y.set(my / rect.height - 0.5);
    
    mouseX.set(mx);
    mouseY.set(my);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`group relative rounded-[2rem] bg-zinc-900/60 border border-zinc-800 overflow-hidden flex flex-col ${className} shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-[2px]`}
    >
      {/* Background Sheen effect / Spotlight tracking the cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] z-20 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-screen"
        style={{
          background: useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(${hoverHex},0.15), transparent 40%)`,
        }}
      />
      
      {/* Light border glow sheen tracking mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: useMotionTemplate`inset 0 0 0 1px rgba(${hoverHex}, 0.2), inset 0 0 20px rgba(${hoverHex}, 0.05)`,
        }}
      />

      {/* SVG Wireframe Illustration component injected below text */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(5,5,5,0.7)_100%)] z-10 pointer-events-none hidden group-hover:block transition-all" />
        {visual}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/60 to-obsidian/20 z-0" />

      <div 
        className="relative z-10 p-6 sm:p-7 md:p-10 flex flex-col h-full w-full"
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const experiences = [
    {
      title: "Web Development Intern",
      subtitle: "CODSOFT • Aug - Sep 2025",
      description: "Developed dynamic and responsive user interfaces using React.js for a seamless frontend experience. Built secure and scalable RESTful APIs and server-side logic utilizing Node.js and Express.js. Integrated MongoDB to efficiently manage database operations and ensure fast, reliable data retrieval.",
      tags: ["REACT.JS", "NODE.JS", "EXPRESS.JS", "MONGODB"],
      span: "md:col-span-2",
      hoverHex: "99,102,241", // Indigo
      visual: <NovaVisual />
    },
    {
      title: "Cloud Computing",
      subtitle: "Jan - Apr 2026",
      description: "Completed comprehensive training on cloud fundamentals, covering IaaS, PaaS, SaaS, virtualization, and cloud security. Gained practical insights into modern cloud deployment models, storage architectures, and networking practices.",
      tags: ["CLOUD", "IAAS / PAAS / SAAS", "NETWORKING"],
      span: "col-span-1",
      hoverHex: "6,182,212", // Cyan
      visual: <AuraVisual />
    },
    {
      title: "Java Software Developer Trainee",
      subtitle: "ICT Academy – Infosys Foundation • Sep - Oct 2026",
      description: "Completed intensive training focusing on Core Java, OOP, multithreading, and JDBC. Developed and debugged backend applications through practical assignments, strengthening problem-solving, database integration, and software engineering skills.",
      tags: ["CORE JAVA", "OOP", "JDBC"],
      span: "col-span-1",
      hoverHex: "16,185,129", // Emerald
      visual: <FluxVisual />
    },
    {
      title: "Software Development Intern",
      subtitle: "PRODIGY INFOTECH • Jun - Jul 2025",
      description: "Contributed to the design and development of scalable software applications, focusing on writing clean, efficient, and maintainable code. Collaborated with the team to debug issues, optimize performance, and deliver seamless user-centric solutions.",
      tags: ["SOFTWARE DEV", "DEBUGGING", "OPTIMIZATION"],
      span: "md:col-span-2",
      hoverHex: "236,72,153", // Pink
      visual: <OrbitVisual />
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative scroll-mt-24">
      <div className="flex flex-col mb-16">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-100 text-glow">
          Professional Record
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 md:auto-rows-[440px]">
        {experiences.map((proj, idx) => {
          const Wrapper = proj.href ? 'a' : 'div';
          return (
            <TiltCard key={idx} className={proj.span} hoverHex={proj.hoverHex} visual={proj.visual}>
              <Wrapper 
                className={`relative z-10 flex flex-col justify-between h-full w-full pointer-events-auto ${proj.href ? 'group block cursor-pointer' : ''}`}
                {...(proj.href ? { href: proj.href, target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{proj.title}</h3>
                  {proj.subtitle && (
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">{proj.subtitle}</p>
                  )}
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed">{proj.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6 md:mt-auto pt-2 relative z-20">
                  {proj.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase rounded-full bg-white/5 border border-white/10 text-zinc-300 backdrop-blur-xl shadow-lg transition-colors hover:bg-white/10 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {proj.hoverImage && (
                  <div className="absolute top-1/2 right-10 md:-right-32 -translate-y-1/2 w-[300px] md:w-[450px] opacity-0 pointer-events-none transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-4 group-hover:scale-105 z-50 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10">
                    <img src={proj.hoverImage} alt={proj.title} className="w-full h-auto object-cover" />
                  </div>
                )}
              </Wrapper>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
