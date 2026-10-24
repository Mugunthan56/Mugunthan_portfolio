import { motion } from "framer-motion";
import profileImg from '../assets/m_2.png';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: [0.32, 0.72, 0, 1] },
  },
});

const TAGS = ["SOFTWARE ENGINEERING","CLOUD COMPUTING"];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative"
    >
      {/* Inner content width mirrors Skills.jsx */}
      <div className="max-w-5xl mx-auto flex flex-col gap-12">

        {/* ── Full-Width Section Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp(0)}
          className="flex items-center gap-6 w-full"
        >
          <div className="flex flex-col shrink-0 w-full md:w-auto text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-none">
              The Person Behind
            </h2>
          </div>
          {/* Decorative horizontal rule extending to the right edge */}
          <div className="flex-1 border-t border-white/10 mt-6 hidden md:block" />
        </motion.div>

        {/* ── Two-Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 md:gap-16 items-center w-full">

          {/* ── Left Column: Portrait Pedestal ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp(0.15)}
            className="flex flex-col items-center md:items-start gap-5 w-full"
          >
            {/* Ambient glow backdrop */}
            <div className="relative w-[220px] sm:w-[240px] md:w-full md:max-w-[240px] mx-auto md:mx-0">
              {/* Glow layer */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 blur-xl rounded-3xl -z-10 pointer-events-none" />

              {/* Glassmorphic pedestal frame */}
              <div className="relative w-full aspect-[4/5] rounded-2xl p-[2px] bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/10 shadow-2xl overflow-hidden">
                {/* Spinning accent ring */}
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg,transparent_78%,rgba(168,85,247,0.6))] animate-[spin_4s_linear_infinite] pointer-events-none" />
                <img
                  src={profileImg}
                  alt="Mugunthan"
                  className="relative w-full h-full object-cover object-top rounded-[14px] bg-zinc-950 z-10"
                />
              </div>
            </div>

            {/* Degree text */}
            <p className="text-sm md:text-base font-medium text-zinc-200 tracking-wide text-center md:text-left mt-4 md:mt-0">
              B.E CSE&nbsp; 2023–2027
              <span className="text-zinc-600 mx-1.5">|</span>
              CGPA&thinsp;: 8.00
            </p>

            {/* Info badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-1 md:mt-0">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs md:text-sm text-zinc-300 backdrop-blur-md shadow-inner">
                <svg className="w-3.5 h-3.5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Coimbatore, India
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs md:text-sm text-zinc-300 backdrop-blur-md shadow-inner">
                <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
                3+ Years of Coding
              </span>
            </div>
          </motion.div>

          {/* ── Right Column: Bio & Tags ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp(0.25)}
            className="flex flex-col w-full min-w-0 gap-5 md:gap-6 items-center md:items-start"
          >
            {/* Paragraphs with keyword highlights */}
            <div className="space-y-5 md:space-y-6 w-full max-w-[92%] sm:max-w-lg md:max-w-2xl mx-auto md:mx-0 text-justify">
              <p className="text-[15px] sm:text-base md:text-xl text-zinc-400 leading-[1.85] font-normal text-justify">
                I am a{" "}
                <span className="text-zinc-100 font-medium">Full-Stack Software Engineer</span>{" "}
                and final-year Computer Science student with a strong emphasis on software
                engineering and building reliable,{" "}
                <span className="text-zinc-100 font-medium">AI-enabled systems</span>. My core
                expertise lies in developing{" "}
                <span className="text-zinc-100 font-medium">scalable RESTful APIs</span>,
                integrating{" "}
                <span className="text-zinc-100 font-medium">predictive machine learning models</span>,
                designing robust backend architectures, and crafting highly interactive, modern
                frontend applications.
              </p>

              <p className="text-[15px] sm:text-base md:text-xl text-zinc-500 leading-[1.85] font-normal text-justify">
                Currently pursuing my B.E. in Computer Science and Engineering at{" "}
                <span className="text-zinc-300 font-medium">RVS Institute of Technology</span>,
                Coimbatore. Beyond academics, I have actively participated in national-level
                hackathons and delivered practical software solutions—ranging from complex data
                modeling and secure database management to cloud deployments. I am deeply
                passionate about building scalable, user-centric systems with a strict focus on
                algorithmic problem-solving, high performance, and long-term maintainability.
              </p>
            </div>

            {/* Architecture pills */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 md:gap-3 mt-4 md:mt-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs md:text-sm font-medium tracking-wider text-zinc-300 uppercase transition-all duration-300 hover:border-cyan-500/40 hover:text-white hover:bg-white/[0.04] hover:-translate-y-0.5 shadow-lg cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
