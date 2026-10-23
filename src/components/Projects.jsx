import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useVelocity, useTransform } from "framer-motion";
import { createPortal } from "react-dom";

const projects = [
  {
    title: "Cardio Sense – Heart Disease Prediction System",
    description: "Developed a machine learning-based heart disease prediction system using Python and Logistic Regression, with a FastAPI backend for model-based predictions. Integrated the backend with a Next.js frontend to provide real-time risk predictions through a user-friendly web interface.",
    image: "/cardio-sense.png",
    tags: ["Python", "FastAPI", "Next.js", "Scikit-learn"],
    href: "https://cardio-sense-dd.vercel.app/",
    badge: "Model Accurate at 94%"
  },
  {
    title: "Agricultural Market Linkage Platform",
    description: "Developed a digital marketplace linking farmers directly with consumers and businesses. Features automated price discovery and secure transaction workflows to promote fair agricultural trade.",
    image: "/agri-market.png",
    tags: ["React", "Node.js", "MongoDB", "Express"]
  }
];

const CursorPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
};

export function Projects() {
  // ── Hover state (UNTOUCHED) ──────────────────────────────────────────────
  const [[hoveredProject, direction], setHoveredState] = useState([null, 1]);

  const cardVariants = {
    initial: (dir) => ({
      opacity: 0,
      scale: 0.95,
      y: dir === 1 ? 20 : -20,
      filter: "blur(10px)"
    }),
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 150, damping: 20 }
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.95,
      y: dir === 1 ? -20 : 20,
      filter: "blur(10px)",
      transition: { type: "spring", stiffness: 150, damping: 20 }
    })
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 30, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const velocityX = useVelocity(smoothX);
  const rotate = useTransform(velocityX, [-800, 800], [-8, 8]);

  const [cardDim, setCardDim] = useState({ w: 340, h: 420 });
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      setCardDim({ w: cardRef.current.offsetWidth, h: cardRef.current.offsetHeight });
    }
  }, [hoveredProject]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    let targetX = clientX + 20;
    let targetY = clientY - 20;

    if (targetX + cardDim.w > innerWidth - 20) {
      targetX = clientX - cardDim.w - 20;
    }
    if (targetY + cardDim.h > innerHeight - 20) {
      targetY = innerHeight - cardDim.h - 20;
    }
    if (targetY < 20) targetY = 20;

    mouseX.set(targetX);
    mouseY.set(targetY);
  };
  // ── End hover state ───────────────────────────────────────────────────────

  return (
    <section
      id="projects"
      className="scroll-mt-24 py-16 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative"
    >
      {/* ── Inner content width mirrors Skills.jsx ── */}
      <div className="max-w-5xl mx-auto">

        {/* ── Bento Grid Outer Card ── */}
        <div
          className="relative w-full rounded-3xl border border-white/[0.08] bg-[#08080a] p-5 sm:p-7 md:p-10 shadow-2xl overflow-hidden"
          onMouseLeave={() => setHoveredState([null, 1])}
          onMouseMove={handleMouseMove}
        >
          {/* Subtle grid-line background overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]"
          />

          {/* ── Card Header Bar ── */}
          <div className="relative z-10 flex items-center justify-between mb-6 md:mb-8">
            {/* Left: terminal badge + title */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono text-sm md:text-base shadow-inner shrink-0">
                &gt;_
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Projects
              </span>
            </div>

            {/* Right: external-link arrow */}
            <span className="text-zinc-500 hover:text-zinc-300 transition-colors text-lg md:text-xl cursor-default select-none">
              ↗
            </span>
          </div>

          {/* ── Stacked Project Row Cards ── */}
          <div className="relative z-10 flex flex-col gap-3.5 md:gap-4">
            {projects.map((proj, idx) => {
              const Wrapper = proj.href ? 'a' : 'div';
              return (
                <Wrapper
                  key={idx}
                  {...(proj.href ? { href: proj.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  onMouseEnter={() => {
                    setHoveredState(prev => {
                      const prevProj = prev[0];
                      let newDir = 1;
                      if (prevProj) {
                        const prevIdx = projects.findIndex(p => p.title === prevProj.title);
                        newDir = idx > prevIdx ? 1 : -1;
                      }
                      return [proj, newDir];
                    });
                  }}
                  className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] px-5 py-4 sm:px-6 sm:py-5 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                >
                  {/* Left: title + description stack */}
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors leading-snug line-clamp-2 sm:line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-zinc-400 truncate group-hover:text-zinc-300 transition-colors">
                      {proj.description}
                    </p>
                  </div>

                  {/* Right: arrow */}
                  <span className="text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-1 transition-all duration-300 shrink-0 text-base md:text-lg select-none">
                    →
                  </span>
                </Wrapper>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Cursor-following hover preview portal (UNTOUCHED) ── */}
      <CursorPortal>
        <motion.div
          ref={cardRef}
          style={{ x: smoothX, y: smoothY, rotate }}
          className="fixed top-0 left-0 hidden [@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:flex flex-col z-[9999] pointer-events-none"
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            {hoveredProject && (
              <motion.div
                key={hoveredProject.title}
                custom={direction}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-[340px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden font-sans flex flex-col"
              >
               <div className="relative w-full h-48 bg-zinc-950">
                 <img src={hoveredProject.image} alt={hoveredProject.title} className="w-full h-full object-cover" />
                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                 {hoveredProject.badge && (
                   <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white border border-white/20 shadow-lg">
                     {hoveredProject.badge}
                   </div>
                 )}
               </div>

               <div className="p-6 pt-2 bg-zinc-900 relative z-10 w-full flex-grow flex flex-col gap-3 border-t-0">
                 <h3 className="text-white text-lg font-bold leading-tight">
                   {hoveredProject.title}
                 </h3>
                 <p className="text-zinc-400 text-xs leading-relaxed">
                   {hoveredProject.description}
                 </p>

                 {hoveredProject.tags && (
                   <div className="flex flex-wrap gap-1.5 mt-2">
                     {hoveredProject.tags.map((tech, i) => (
                       <span key={i} className="px-2 py-0.5 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-300 text-[10px] font-medium tracking-wide">
                         {tech}
                       </span>
                     ))}
                   </div>
                 )}
               </div>
             </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </CursorPortal>
    </section>
  );
}
