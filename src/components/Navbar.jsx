import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Navbar() {
  const links = ["About", "Skills", "Experience", "Projects", "Certificates", "Contact"];
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      let current = "";
      
      for (const link of links) {
        const id = link.toLowerCase();
        const section = document.getElementById(id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          // Trigger when section reaches the middle-ish part of viewport
          if (scrollPos >= offsetTop - windowHeight / 3 && scrollPos < offsetTop + offsetHeight - windowHeight / 3) {
            current = link;
          }
        }
      }
      setActiveTab(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialized
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between p-1.5 rounded-full border border-white/10 bg-black/20 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.4)] max-w-[94vw] md:w-auto overflow-hidden ring-1 ring-white/5"
    >
      <a href="#hero" className="pl-3 md:pl-5 pr-2 py-2 text-[11px] md:text-sm font-semibold text-white tracking-widest hover:opacity-80 transition-opacity shrink-0 uppercase">Portfolio</a>

      <div className="w-[1px] h-5 bg-white/10 shrink-0 mx-1 md:mx-2"></div>

      <div className="flex overflow-x-auto items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pr-1">
        {links.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-500 whitespace-nowrap shrink-0 rounded-full ${activeTab === item ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
