import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, MotionValue } from 'framer-motion';
import { Terminal, Layers, User, Mail, ArrowRight, X, Aperture, Cpu, PenTool, Video, Move, ZoomIn, Play, Linkedin, Copy, Check, Sparkles } from 'lucide-react';

// --- TYPES ---
interface Project {
  id: number;
  title: string;
  category: string;
  size: string;
  image: string;
  video?: string; 
  videoGallery?: { title: string; src: string }[]; 
  tags: string[];
  link: string;
  year?: string;
  role?: string;
  description: string;
  gallery?: string[];
  isPlaceholder?: boolean; 
}

interface Skill {
  title: string;
  icon: React.ElementType;
}

// --- DATA SOURCE ---
// NO IMPORTS USED. 
// These paths assume you have moved your 'assets' folder into the 'public' folder.
const CONTENT = {
  hero: {
    headline: ["REANNE", "MARTIN"], 
    subtext: "I bring clarity and creativity to every piece of content I craft, building stories and systems that help ideas move with purpose."
  },
  projects: [
    {
      id: 1,
      title: "The Burnout Story",
      category: "Content System",
      size: "large", // 2x2 Hero
      image: "/assets/burnout.jpg", 
      video: "https://www.youtube.com/embed/5z3p6RfU6-w", 
      tags: ["Strategy", "Video Production"],
      year: "2024",
      role: "Creative System Developer",
      link: "https://youtu.be/5z3p6RfU6-w?si=PUuogjmjG-1NzPJz",
      description: "For Isak Vidinghoff, I developed a cohesive creative system rooted in the essence of rebuilding purpose after burnout. I translated his reflective philosophy into a visual identity that feels calm and structured. This included full-cycle editing of long-form videos, color grading, and a repurposing system that turns one video into 6 reels, 3 blog posts, and multiple social assets.",
      videoGallery: [
        { title: "Latest Sample Video Edit", src: "/assets/sample_edit.mp4" },
        { title: "YT Endscreen", src: "/assets/yt_endscreen.mp4" },
        { title: "YT Intro", src: "/assets/yt_intro.mp4" }
      ]
    },
    {
      id: 2,
      title: "Minds of Means",
      category: "Podcast Branding",
      size: "wide", // 2x1 Landscape
      image: "/assets/minds.jpg", 
      tags: ["Identity", "Editing"],
      year: "2024",
      role: "Brand Designer & Editor",
      link: "#",
      description: "Developed a brand identity that blends modern entrepreneurial energy with a clean aesthetic. My role included editing hour-long podcast conversations, designing on-brand overlays, lower thirds, and managing noise/color correction. I established a visual rhythm that reinforces the brand's personality across YouTube and social platforms.",
      videoGallery: [
        { title: "YouTube Intro", src: "/assets/mom_intro.mp4" },
        { title: "YouTube Endscreen", src: "/assets/mom_endscreen.mp4" },
        { title: "1-Speaker Layout", src: "/assets/mom_speaker1.mp4" },
        { title: "2-Speaker Layout", src: "/assets/mom_speaker2.mp4" }
      ],
      gallery: [
        "/assets/mom_brand_logo.png",
        "/assets/mom_brand_header.jpg",
        "/assets/mom_layout_1.png",
        "/assets/mom_layout_2.png",
        "/assets/mom_layout_3.png"
      ]
    },
    {
      id: 3,
      title: "Tinamplings",
      category: "Ad Design",
      size: "tall", // 1x2 Vertical Poster
      image: "/assets/tinamplings.jpg", 
      tags: ["AI Art", "Marketing"],
      year: "2023",
      role: "Visual Designer",
      link: "#",
      description: "A promotional ad for 'Tinamplings' that blends appetizing visual marketing with an educational hook about smoking fish (tinapa). Features AI-generated food visuals for high-quality appeal and clear price point communication."
    },
    {
      id: 4,
      title: "Academic Scholars",
      category: "Publication",
      size: "wide", // 2x1 Landscape Pixel Art
      image: "/assets/scholars.jpg", 
      tags: ["Pixel Art", "Layout"],
      year: "2023",
      role: "Illustrator",
      link: "#",
      description: "Developed a Pixel-Art–themed set of publication materials to honor academic achievers. Merges nostalgic 8-bit aesthetics with modern layout principles for a fun celebration of student achievement."
    },
    {
      id: 5,
      title: "Colors Inside Out",
      category: "Event Identity",
      size: "standard", // 1x1 Square
      image: "/assets/colors.jpg", 
      tags: ["Graphic Design", "Print"],
      year: "2023",
      role: "Graphic Designer",
      link: "#",
      description: "A poster for Mental Health Awareness Month using a corkboard motif and 3D elements. The design uses mismatched typography and 'googly eyes' to visually normalize the messy reality of internal emotions, making a serious topic approachable."
    },
    {
      id: 6,
      title: "Chemfiguration",
      category: "Event Poster",
      size: "standard", // 1x1 Square
      image: "/assets/chem.jpg", 
      tags: ["Retro Style", "Illustration"],
      year: "2023",
      role: "Visual Designer",
      link: "#",
      description: "A retro, pixel-art–themed poster for a freshmen meet and greet. Inspired by classic video games, using bright pixel skies and character sprites to create a welcoming atmosphere for new students."
    },
    {
      id: 7,
      title: "Feb-ibig Reveal",
      category: "Storytelling",
      size: "standard", // 1x1 Square
      image: "/assets/febibig.jpg", 
      tags: ["Layout", "Illustration"],
      year: "2023",
      role: "Layout Artist",
      link: "#",
      description: "A playful, scrapbook-inspired poster for a story-writing contest. The layout combines torn paper textures, doodles, flowers, and handwritten elements to evoke nostalgia and warmth."
    },
    {
      id: 8,
      title: "Period Tracking",
      category: "Advocacy",
      size: "standard", // 1x1 Square
      image: "/assets/period.jpg", 
      tags: ["Advocacy", "Illustration"],
      year: "2023",
      role: "Campaign Designer",
      link: "#",
      description: "Designed for International Period Month. The artwork features a warm, friendly illustration with soft pastel textures to reflect femininity and comfort, aimed at ending menstrual stigma."
    },
    {
      id: 9,
      title: "That Crispy Bite",
      category: "Social Media",
      size: "standard", // 1x1 Square
      image: "/assets/milk.jpg", 
      tags: ["Social Media", "Layout"],
      year: "2023",
      role: "Ad Designer",
      link: "#",
      description: "Playful, appetizing ads for student-budget meals and drinks. Focused on vibrant color grading and dynamic typography to capture attention on social media feeds.",
      gallery: [
        "/assets/hwachae.jpg",
        "/assets/mango.jpg",
        "/assets/silog.jpg"
      ]
    },
    // --- FILLER ITEM: THE "WORK WITH ME" CARD ---
    {
      id: 10,
      title: "Your Project Next?",
      category: "Open for Collab",
      size: "standard", 
      image: "", 
      tags: ["Contact"],
      link: "#", // Placeholder link, functionality handled by onClick
      year: "2025",
      role: "Collaborator",
      description: "I am currently available for freelance projects and long-term collaborations.",
      isPlaceholder: true
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
    email: "reannemartin.business@gmail.com",
    linkedin: "https://www.linkedin.com/in/reanne-martin"
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

const GlobalStyles = () => (
  <style>{`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

// --- NEW COMPONENT: CONTACT MODAL ---
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTENT.about.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-periwinkle via-purple-500 to-periwinkle" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-white mb-2 font-serif">Let's Create Together</h3>
            <p className="text-gray-400 mb-8 text-sm">
              Open to freelance projects and collaborations.
            </p>

            <div className="space-y-4">
              {/* Copy Email Button */}
              <button 
                onClick={handleCopy}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-periwinkle/10 rounded-lg text-periwinkle">
                    <Mail size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                    <p className="text-white text-sm font-medium truncate max-w-[200px]">{CONTENT.about.email}</p>
                  </div>
                </div>
                <div className="text-white/40 group-hover:text-white transition-colors">
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </div>
              </button>

              {/* LinkedIn Button */}
              <a 
                href={CONTENT.about.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#0077b5]/20 rounded-lg text-[#0077b5]">
                    <Linkedin size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Social</p>
                    <p className="text-white text-sm font-medium">LinkedIn Profile</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
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

      {/* Dimmed Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 opacity-10 pointer-events-none select-none">
        <div className="flex flex-col items-center leading-[0.85] tracking-[-0.05em] text-[15vw] md:text-[12vw] font-bold text-gray-800 font-serif">
           <span>{CONTENT.hero.headline[0]}</span>
           <span>{CONTENT.hero.headline[1]}</span>
        </div>
      </div>

      {/* Illuminated Layer */}
      <motion.div 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        style={{
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
      
      {/* Mobile Hint */}
      {isMobile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-3/4 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-30"
        >
          <Move className="w-4 h-4 text-white/30" />
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Drag to Light</span>
        </motion.div>
      )}

      <button 
        onClick={scrollToWork}
        className="absolute bottom-10 left-0 right-0 text-center text-xs text-white/30 uppercase tracking-widest animate-bounce z-30 hover:text-white transition-colors cursor-pointer"
      >
        Scroll to Explore
      </button>
    </section>
  );
};

const Dock = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const mouseX = useMotionValue(Infinity);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[300px] md:max-w-fit">
      <motion.div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end justify-center gap-2 md:gap-4 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        <DockIcon onClick={() => scrollTo('work')} mouseX={mouseX} icon={<Terminal size={20} />} label="Work" />
        <DockIcon onClick={() => scrollTo('about')} mouseX={mouseX} icon={<User size={20} />} label="About" />
        <DockIcon onClick={() => scrollTo('systems')} mouseX={mouseX} icon={<Layers size={20} />} label="Systems" />
        <DockIcon onClick={onOpenContact} mouseX={mouseX} icon={<Mail size={20} />} label="Contact" />
      </motion.div>
    </div>
  );
};

const DockIcon = ({ mouseX, icon, label, onClick }: { mouseX: MotionValue; icon: React.ReactNode; label: string; onClick?: () => void }) => {
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

const BentoGrid = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);

  // --- BUG FIX 1: SCROLL LOCK ---
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedId]);

  const getGridClasses = (size: string) => {
    switch(size) {
      case 'large': return 'md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-[500px]';
      case 'wide': return 'md:col-span-2 min-h-[250px] md:min-h-[300px]';
      case 'tall': return 'md:row-span-2 min-h-[500px]';
      default: return 'col-span-1 min-h-[250px] md:min-h-[300px]';
    }
  };

  const selectedProject = CONTENT.projects.find(p => p.id === selectedId);

  return (
    <section id="work" className="min-h-screen py-24 px-4 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-7xl font-bold text-white mb-16 tracking-tighter font-serif"
        >
          SELECTED<br/>WORKS
        </motion.h2>

        {/* Dense Grid for Tetris Effect */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-min pb-24 grid-flow-dense">
          {CONTENT.projects.map((project: Project) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              // UPDATED: If placeholder, call onOpenContact instead of setting selectedId
              onClick={project.isPlaceholder ? onOpenContact : () => setSelectedId(project.id)}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-card cursor-pointer ${getGridClasses(project.size)} ${project.isPlaceholder ? 'flex flex-col justify-between p-8 bg-gradient-to-br from-periwinkle/10 to-transparent hover:border-periwinkle/50 transition-colors' : ''}`}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {project.isPlaceholder ? (
                // --- FILLER CARD DESIGN ---
                <>
                  <div className="flex justify-between items-start">
                    <Sparkles className="text-periwinkle w-8 h-8" />
                    <ArrowRight className="text-white/50 -rotate-45 group-hover:text-white group-hover:rotate-0 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight font-serif">
                      Your Project Next?
                    </h3>
                    <p className="text-gray-400 text-xs">
                      Open for collaborations.
                    </p>
                  </div>
                </>
              ) : (
                // --- STANDARD PROJECT CARD ---
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 md:opacity-60 group-hover:opacity-40"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-periwinkle/50 rounded-3xl transition-colors duration-300" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent to-transparent">
                    <motion.div className="translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider bg-white/10 backdrop-blur-md px-2 py-1 rounded-full text-white/90 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl md:text-3xl font-bold text-white mb-1 font-serif">{project.title}</h3>
                      <p className="text-gray-400 text-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                        {project.category}
                      </p>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedId && selectedProject && !selectedProject.isPlaceholder && (
          <motion.div 
            className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/90 backdrop-blur-xl p-0 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={`card-${selectedId}`}
              className="w-full md:max-w-6xl h-[90vh] md:h-[90vh] bg-[#0a0a0a] rounded-t-3xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors z-30 border border-white/10"
              >
                <X size={20} />
              </button>
              
              {/* Left Side: Visual */}
              <div className="w-full md:w-2/3 h-1/3 md:h-full relative bg-[#050505] flex items-center justify-center overflow-hidden group">
                 <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl scale-125" 
                    style={{ backgroundImage: `url(${selectedProject.image})` }} 
                 />
                 <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-contain relative z-10 p-4 md:p-8"
                 />
                 <div className="absolute inset-0 z-20 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a] pointer-events-none" />
              </div>
              
              {/* Right Side: Details & Gallery */}
              {/* --- BUG FIX 2: ADDED pb-32 FOR MOBILE PADDING --- */}
              <div className="w-full md:w-1/3 p-8 md:p-12 pb-32 md:pb-12 flex flex-col bg-[#0a0a0a] border-l border-white/5 overflow-y-auto no-scrollbar">
                <div className="mb-8">
                  <span className="text-periwinkle text-xs font-bold uppercase tracking-widest border border-periwinkle/30 px-3 py-1 rounded-full">
                     {selectedProject.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4 font-serif">{selectedProject.title}</h2>
                  <p className="text-gray-400 text-lg leading-relaxed mt-4">
                     {selectedProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 py-8 border-t border-white/10">
                   <div>
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">Year</h4>
                      <p className="text-white font-medium">{selectedProject.year || "2024"}</p>
                   </div>
                   <div>
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">Role</h4>
                      <p className="text-white font-medium">{selectedProject.role || "Creative Lead"}</p>
                   </div>
                </div>

                {/* --- VIDEO ASSETS --- */}
                {selectedProject.videoGallery && selectedProject.videoGallery.length > 0 && (
                  <div className="border-t border-white/10 py-8">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Video Assets</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.videoGallery.map((vid, idx) => (
                        <div 
                          key={idx} 
                          className="flex flex-col gap-2 cursor-pointer group"
                          onClick={() => setLightboxVideo(vid.src)}
                        >
                          <div className="aspect-video rounded-lg border border-white/10 overflow-hidden bg-black/50 relative">
                            <video src={vid.src} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted loop onMouseOver={e => e.currentTarget.play()} onMouseOut={e => e.currentTarget.pause()} />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <Play size={24} className="text-white/80 group-hover:scale-110 transition-transform" />
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider truncate group-hover:text-white transition-colors">{vid.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- IMAGE GALLERY --- */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div className="border-t border-white/10 py-8">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Project Gallery</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.gallery.map((imgSrc, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxImg(imgSrc)}
                          className="aspect-square rounded-lg border border-white/10 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity group relative"
                        >
                          <img src={imgSrc} alt="Gallery" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                            <ZoomIn size={20} className="text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.link !== "#" && (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer" 
                    className="w-full py-4 bg-white text-black rounded-lg font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-xs flex items-center justify-center gap-2 mt-4"
                  >
                    View Live Project <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMAGE LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightboxImg(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
              onClick={() => setLightboxImg(null)}
            >
              <X size={24} />
            </button>
            <motion.img 
              src={lightboxImg} 
              alt="Full View" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightboxVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
              onClick={() => setLightboxVideo(null)}
            >
              <X size={24} />
            </button>
            <motion.video 
              src={lightboxVideo} 
              controls
              autoPlay
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} 
            />
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
            SYSTEMS = CLARITY
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

const AboutSection = ({ onOpenContact }: { onOpenContact: () => void }) => {
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
            src="/assets/PPhoto.png" // Use public path string for soft reference
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
          
          <div className="mt-12 flex flex-wrap gap-4">
            <button 
              onClick={onOpenContact}
              className="inline-block px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              Get in touch
            </button>
            <a 
              href={CONTENT.about.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors gap-2"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// --- MAIN APP ---

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void text-white font-sans selection:bg-periwinkle/30 selection:text-white">
      <GlobalStyles />
      <GrainOverlay />
      <main className="relative z-10 pb-24">
        <HeroSection />
        {/* Pass the handler to BentoGrid */}
        <BentoGrid onOpenContact={() => setIsContactOpen(true)} />
        <ScrollyTelling />
        <AboutSection onOpenContact={() => setIsContactOpen(true)} />
        
        <footer className="py-12 text-center text-gray-600 text-sm uppercase tracking-widest border-t border-white/5">
          © 2025 Reanne Mae Martin. All Rights Reserved.
        </footer>
      </main>
      <Dock onOpenContact={() => setIsContactOpen(true)} />
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;