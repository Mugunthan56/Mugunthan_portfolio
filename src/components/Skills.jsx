import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "../data/skillsData";

function SkillBlock({ name, icon, color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative flex flex-col items-center justify-center gap-4 p-6 md:p-8 rounded-[2rem] bg-[#08080a] border border-white/[0.08] hover:border-white/[0.18] transition-colors duration-500 cursor-pointer overflow-hidden shadow-2xl transform-gpu will-change-transform"
    >
      {/* Architectural grid backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Background fill glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      {/* Inner border glow tracking the specific brand color */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[2rem]"
        style={{ boxShadow: `inset 0 0 30px ${color}15, inset 0 0 2px ${color}60` }}
      />
      
      {/* Giant Icon Wrapper transitioning color */}
      <div 
        className="relative z-10 flex items-center justify-center transition-colors duration-300 w-12 h-12 md:w-16 md:h-16 [&>svg]:w-full [&>svg]:h-full"
        style={{ color: isHovered ? color : "rgba(255, 255, 255, 0.4)" }} 
      >
        {icon}
      </div>
      
      {/* Text label transitioning color */}
      <span 
        className="relative z-10 text-xs md:text-sm font-medium tracking-wide transition-colors duration-300 text-center"
        style={{ color: isHovered ? "#ffffff" : "#a1a1aa" }}
      >
        {name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative">
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-100 mb-16 text-center text-glow">
        Technical Arsenal
      </h2>
      
      <div className="flex flex-col gap-10 max-w-5xl mx-auto">
        
        {/* Tab Headers */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 relative z-20">
          {skillCategories.map((cat, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveIndex(idx)}
                className={`relative px-5 py-2.5 rounded-full font-medium text-[13px] md:text-sm transition-all duration-300 ${
                  isActive ? "text-cyan-50" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                }`}
              >
                <span className="relative z-10">{cat.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute inset-0 bg-cyan-950/30 border border-cyan-500/50 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Box with layout animations */}
        <div className="min-h-[400px] relative mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {skillCategories[activeIndex].skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="transform-gpu will-change-transform"
                >
                  <SkillBlock 
                    name={skill.name} 
                    icon={skill.icon} 
                    color={skill.color} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
