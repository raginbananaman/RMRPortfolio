import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, MotionValue } from 'framer-motion';
import { Terminal, Layers, User, Mail, ArrowRight, X, Aperture, Cpu, PenTool, Video } from 'lucide-react';

// --- TYPES ---
interface Project {
  id: number;
  title: string;
  category: string;
  size: string;
  image: string;
  tags: string[];
  link: string;
}

interface Skill {
  title: string;
  icon: React.ElementType;
}

// --- DATA SOURCE ---
const CONTENT = {
  hero: {
    headline: ["REANNE", "MARTIN"], 
    subtext: "I bring clarity and creativity to every piece of content I craft, building stories and systems that help ideas move with purpose."
  },
  projects: [
    {
      id: 1,
      title: "The Burnout Story",
      category: "Documentary",
      size: "large", // Hero Item (2x2)
      image: "https://images.unsplash.com/photo-1522075469751-3a368c6fcfbb?q=80&w=2070&auto=format&fit=crop", 
      tags: ["Direction", "Video"],
      link: "#"
    },
    {
      id: 2,
      title: "Minds of Means",
      category: "Podcast",
      size: "wide", // Wide Item (2x1)
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop", 
      tags: ["Branding", "Media"],
      link: "#"
    },
    {
      id: 3,
      title: "Colors Inside Out",
      category: "Editorial",
      size: "standard", // Standard
      image: "https://images.unsplash.com/photo-1586075010923-2dd45eeed858?q=80&w=2070&auto=format&fit=crop", 
      tags: ["Layout"],
      link: "#"
    },
    {
      id: 4,
      title: "Academic Scholars",
      category: "Illustration",
      size: "standard",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", 
      tags: ["Pixel Art"],
      link: "#"
    },
    {
      id: 5,
      title: "Quench Your Thirst",
      category: "Social Media",
      size: "standard",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop", 
      tags: ["Ad Design"],
      link: "#"
    },
    {
      id: 6,
      title: "Feb-ibig Pascal",
      category: "Storytelling",
      size: "standard",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop", 
      tags: ["Layout"],
      link: "#"
    },
    {
      id: 7,
      title: "Feb-ibig Pascal",
      category: "Storytelling",
      size: "standard",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop", 
      tags: ["Layout"],
      link: "#"
    },
    {
      id: 8,
      title: "Feb-ibig Pascal",
      category: "Storytelling",
      size: "standard",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop", 
      tags: ["Layout"],
      link: "#"
    }
  ],
  skills: [
    { title: "Video Editing", icon: Video },
    { title: "Creative Direction", icon: Aperture },
    { title: "Content Systems", icon: Layers },
    { title: "Branding & Identity", icon: PenTool },
    { title: "Motion Graphics", icon: Cpu },
  ],
  about: {
    bio: [
      "Hi, I am Reanne, a passionate creative who finds joy in turning structure into something soulful.",
      "My approach blends intuition and precision, where the heart of storytelling meets the clarity of design.",
      "Based in the digital ether. Available worldwide."
    ],
    email: "hello@reanne.com"
  }
};

// --- UTILITY COMPONENTS ---

const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay">
    <div className="absolute inset-0 bg-repeat w-full h-full" 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
    </div>
  </div>
);

// --- SECTIONS ---

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  }));
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    // Update position on mouse move
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    // Update position on touch drag
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    });
  };

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) workSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-void cursor-default touch-none md:touch-auto"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-periwinkle/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-navy/30 rounded-full blur-[128px]" />
      </div>

      {/* Dimmed Layer (Background Text) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 opacity-10 pointer-events-none select-none">
        <div className="flex flex-col items-center leading-[0.85] tracking-[-0.05em] text-[15vw] md:text-[12vw] font-bold text-gray-800 font-serif">
           <span>{CONTENT.hero.headline[0]}</span>
           <span>{CONTENT.hero.headline[1]}</span>
        </div>
      </div>

      {/* Illuminated Layer (The Reveal) */}
      <motion.div 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        style={{
          // Use dynamic position for both mobile and desktop
          maskImage: `radial-gradient(circle ${isMobile ? '250px' : '350px'} at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle ${isMobile ? '250px' : '350px'} at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
        }}
      >
        <div className="flex flex-col items-center leading-[0.85] tracking-[-0.05em] text-[15vw] md:text-[12vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 font-serif filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
           <span>{CONTENT.hero.headline[0]}</span>
           <span>{CONTENT.hero.headline[1]}</span>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-12 text-center max-w-xs md:max-w-xl px-6 text-base md:text-xl font-light tracking-[0.05em] text-blue-100/90 leading-relaxed font-sans"
        >
          {CONTENT.hero.subtext}
        </motion.p>
      </motion.div>
      
      <button 
        onClick={scrollToWork}
        className="absolute bottom-10 left-0 right-0 text-center text-xs text-white/30 uppercase tracking-widest animate-bounce z-30 hover:text-white transition-colors cursor-pointer"
      >
        Scroll to Explore
      </button>
    </section>
  );
};

const Dock = () => {
  const mouseX = useMotionValue(Infinity);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = () => {
     window.location.href = `mailto:${CONTENT.about.email}`;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[300px] md:max-w-fit">
      <motion.div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end justify-center gap-2 md:gap-4 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        <DockIcon onClick={() => scrollTo('work')} mouseX={mouseX} icon={<Terminal size={20} />} label="Work" />
        <DockIcon onClick={() => scrollTo('about')} mouseX={mouseX} icon={<User size={20} />} label="About" />
        <DockIcon onClick={() => scrollTo('systems')} mouseX={mouseX} icon={<Layers size={20} />} label="Systems" />
        <DockIcon onClick={handleContact} mouseX={mouseX} icon={<Mail size={20} />} label="Contact" />
      </motion.div>
    </div>
  );
};

const DockIcon = ({ mouseX, icon, label, onClick }: { mouseX: MotionValue; icon: React.ReactNode; label: string; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="aspect-square rounded-xl bg-white/10 border border-white/5 flex items-center justify-center relative group cursor-pointer hover:bg-white/20 transition-colors w-10 md:w-auto"
      whileTap={{ scale: 0.9 }}
    >
      <div className="text-white/80 group-hover:text-white transition-colors scale-75 md:scale-100">
        {icon}
      </div>
      <span className="hidden md:block absolute -top-10 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
};

const BentoGrid = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const getGridClasses = (size: string) => {
    switch(size) {
      case 'large': return 'md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[500px]';
      case 'wide': return 'md:col-span-2 min-h-[250px]';
      case 'tall': return 'md:row-span-2 min-h-[500px]';
      default: return 'col-span-1 min-h-[250px]';
    }
  };

  const selectedProject = CONTENT.projects.find(p => p.id === selectedId);

  return (
    <section id="work" className="min-h-screen py-20 px-4 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-6xl font-bold text-white mb-12 tracking-tight font-serif"
        >
          Selected Works <span className="block md:inline text-gray-500 font-serif italic text-xl md:text-2xl md:ml-4 mt-2 md:mt-0">2023-2025</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-min pb-24">
          {CONTENT.projects.map((project: Project) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-card cursor-pointer ${getGridClasses(project.size)}`}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 md:opacity-60 group-hover:opacity-40"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-periwinkle/50 rounded-3xl transition-colors duration-300" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent to-transparent">
                <motion.div className="translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 mb-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider bg-white/10 backdrop-blur-md px-2 py-1 rounded-full text-white/90 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 font-serif">{project.title}</h3>
                  <p className="text-gray-400 text-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                    {project.category}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div 
            className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-md p-0 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={`card-${selectedId}`}
              className="w-full md:max-w-5xl h-[90vh] md:h-[85vh] bg-[#0a0a0a] rounded-t-3xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 p-2 bg-black/50 backdrop-blur rounded-full text-white hover:bg-white/20 transition-colors z-20 border border-white/10"
              >
                <X size={20} />
              </button>
              
              <div className="h-1/3 md:h-1/2 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${selectedProject.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
              </div>
              
              <div className="p-6 md:p-12 flex-1 overflow-y-auto no-scrollbar">
                <span className="text-periwinkle text-xs font-bold uppercase tracking-widest border border-periwinkle/30 px-3 py-1 rounded-full">
                   {selectedProject.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white my-4 font-serif">{selectedProject.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
                   <div className="md:col-span-2 space-y-4 text-base md:text-lg leading-relaxed">
                     <p>
                       This project represents a deep dive into the intersection of {selectedProject.tags[0]} and visual storytelling. 
                       The goal was to create a system that is both rigid in structure yet fluid in expression.
                     </p>
                   </div>
                   <div className="space-y-6">
                      <a 
                        href={selectedProject.link}
                        target="_blank"
                        rel="noreferrer" 
                        className="w-full py-3 bg-white text-black rounded-lg font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-xs flex items-center justify-center gap-2"
                      >
                        View Live <ArrowRight size={14} />
                      </a>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ScrollyTelling = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="systems" ref={containerRef} className="py-32 px-4 relative bg-black/20">
      <div className="max-w-2xl mx-auto relative">
        <motion.div 
          className="absolute left-4 md:left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-periwinkle to-purple-500/0 origin-top"
          style={{ scaleY: scrollYProgress }}
        />
        
        <div className="space-y-32 pl-12 md:pl-20">
          {CONTENT.skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} index={index} />
          ))}
        </div>

        <motion.div 
          className="mt-32 text-center pl-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-periwinkle filter blur-[0.5px]">
            SYSTEMS THAT GIVE CLARITY
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

const SkillItem = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-4 text-periwinkle mb-2">
         <skill.icon size={20} />
         <span className="text-xs font-mono uppercase tracking-widest opacity-70">Skill Set 0{index + 1}</span>
      </div>
      <h3 className="text-2xl md:text-5xl font-bold text-white group cursor-default">
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
          {skill.title}
        </span>
      </h3>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-void pointer-events-none" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center relative z-10">
        
        {/* Glass Card Photo */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[3/4] rounded-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-2xl z-10 pointer-events-none" />
          <img 
            src="src\assets\PPhoto.png" 
            alt="Reanne"
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
          />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md px-6 py-4 border border-white/10 rounded-lg z-20 text-right"
          >
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white font-bold">Open to Work</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter font-serif">
            ABOUT
          </h2>
          <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-light font-sans">
            {CONTENT.about.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <a 
            href={`mailto:${CONTENT.about.email}`}
            className="inline-block mt-12 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>

      </div>
    </section>
  );
};

// --- MAIN APP ---

const App = () => {
  return (
    <div className="min-h-screen bg-void text-white font-sans selection:bg-periwinkle/30 selection:text-white">
      <GrainOverlay />
      <main className="relative z-10 pb-24">
        <HeroSection />
        <BentoGrid />
        <ScrollyTelling />
        <AboutSection />
        
        <footer className="py-12 text-center text-gray-600 text-sm uppercase tracking-widest border-t border-white/5">
          © 2025 Reanne Mae Martin. All Rights Reserved.
        </footer>
      </main>
      <Dock />
    </div>
  );
};

export default App;