import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import transition from "../components/transition";
import logo from "../assets/DC_LOGO.png";

gsap.registerPlugin(ScrollTrigger);

function CareersPageContent() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const hasAnimated = useRef(false);
  const lenis = useLenis();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll AND stop Lenis when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      if (lenis) {
        lenis.stop();
        lenis.options.wheelMultiplier = 0;
        lenis.options.touchMultiplier = 0;
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      if (lenis) {
        lenis.options.wheelMultiplier = 1;
        lenis.options.touchMultiplier = 1;
        lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      if (lenis) {
        lenis.options.wheelMultiplier = 1;
        lenis.options.touchMultiplier = 1;
        lenis.start();
      }
    };
  }, [selectedJob, lenis]);


  const jobCategories = [
    { id: "all", name: "All Positions" },
    { id: "creative", name: "Creative" },
    { id: "technical", name: "Technical" },
    { id: "specialized", name: "Specialized" }
  ];

  const jobs = [
    {
      id: 1,
      title: "Video Editor",
      subtitle: "Social Media Marketing",
      category: "creative",
      experience: "1-3 years",
      type: "Full-time",
      description: "Create engaging video content tailored for various digital platforms. Drive engagement through compelling storytelling and trend-aware content.",
      keySkills: ["DaVinci Resolve", "Social Media Strategy", "Content Creation", "Motion Graphics"],
      responsibilities: [
        "Shoot, edit, and produce videos for Instagram, YouTube, Facebook and LinkedIn",
        "Develop reels, promos, ads, and animated posts",
        "Research trending content and optimize for platform-specific requirements",
        "Monitor performance and provide engagement reports"
      ]
    },
    {
      id: 2,
      title: "3D Generalist",
      category: "creative",
      experience: "1-3 years",
      type: "Full-time",
      description: "Create high-quality 3D assets, animations, and visual effects for advertising, product visualization, and animation projects.",
      keySkills: ["Blender", "Unreal Engine", "Cycles/Evee", "DaVinci Resolve"],
      responsibilities: [
        "Create 3D models, textures, and materials",
        "Animate characters, objects, and environments",
        "Set up realistic lighting and rendering",
        "Work on simulations for smoke, fluids, and particles"
      ]
    },
      {
      id: 3,
      title: "AI Artist",
      category: "creative",
      experience: "1+ years",
      type: "Full-time",
      description: "Create high-quality AI-driven ad content using advanced generative tools for innovative digital campaigns.",
      keySkills: ["Midjourney", "ComfyUI", "Kling AI", "DaVinci Resolve"],
      responsibilities: [
        "Generate visual ads and videos using AI tools",
        "Develop customized brand assets using prompt engineering",
        "Edit and enhance AI-generated content",
        "Research emerging AI tools and creative technologies"
      ]
    },
    {
      id: 4,
      title: "Social Media Designer",
      category: "creative",
      experience: "1-3 years",
      type: "Full-time",
      description: "Create visually appealing designs that communicate our message and enhance brand identity across all platforms.",
      keySkills: ["Photopea", "Inkscape", "Figma", "Canva"],
      responsibilities: [
        "Design social media posts, ads, and promotional graphics",
        "Create branding assets including logos and packaging",
        "Maintain consistent brand guidelines",
        "Research design trends and optimize for web/mobile"
      ]
    },
    {
      id: 5,
      title: "Software Developer",
      subtitle: "E-commerce & App Development",
      category: "technical",
      experience: "1-5 years",
      type: "Full-time",
      description: "Build high-quality, scalable digital platforms supporting marketing, branding, and product sales goals.",
      keySkills: ["React", "Node.js", "Flutter", "E-commerce Platforms"],
      responsibilities: [
        "Develop e-commerce platforms and mobile applications",
        "Implement secure payment gateways and optimize performance",
        "Build scalable backend systems and manage databases",
        "Conduct QA testing and security audits"
      ]
    },
    {
      id: 6,
      title: "AR/VR Developer",
      category: "technical",
      experience: "1-4 years",
      type: "Full-time",
      description: "Design and develop immersive AR/VR experiences for marketing campaigns, product showcases, and interactive brand experiences.",
      keySkills: ["Unity3D", "Unreal Engine", "ARCore/ARKit", "C#"],
      responsibilities: [
        "Develop AR experiences using Unity and Meta Spark",
        "Build VR environments for Oculus and HTC Vive",
        "Optimize 3D environments for mobile and headset performance",
        "Implement gesture control and interactive systems"
      ]
    },
    {
      id: 7,
      title: "3D Printing Specialist",
      category: "specialized",
      experience: "1+ years",
      type: "Full-time",
      description: "Handle 3D modeling preparation, machine operations, and quality control for prototyping and manufacturing services.",
      keySkills: ["FDM/SLA Printers", "Cura", "Blender", "Post-Processing"],
      responsibilities: [
        "Operate and maintain 3D printers",
        "Prepare and optimize 3D models for printing",
        "Perform quality control and post-processing",
        "Monitor material usage and machine performance"
      ]
    },

  ];

  const filteredJobs = activeCategory === "all" 
    ? jobs 
    : jobs.filter(job => job.category === activeCategory);

  // Hero animations - only once on mount
  useGSAP(() => {
    if (hasAnimated.current) return;

    gsap.from('.careers-hero-title', {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.3
    });

    gsap.from('.careers-hero-subtitle', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 0.5
    });

    hasAnimated.current = true;
  }, []);

  return (
    <>
      {/* Simple Header with Back to Home */}
      <header className="fixed w-full h-24 top-0 left-0 right-0 z-40 backdrop-blur-md flex items-center justify-between border-b border-white/10 pr-4 sm:pr-8">
        <Link to="/" className="flex items-center justify-center gap-2 cursor-pointer">
          <img src={logo} alt="Dream Capture logo" className="w-48 sm:w-56 md:w-64" />
        </Link>
        <Link
          to="/"
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all duration-300 text-sm sm:text-base"
        >
          Back to Home
        </Link>
      </header>

      <div 
        className="min-h-screen py-24 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #01092d 10%, #01092d 50%, #01092d 100%)'
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-500 rounded-full blur-[100px] sm:blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-amber-600 rounded-full blur-[120px] sm:blur-[180px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 my-8 sm:my-12 lg:my-16">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 
              className="careers-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-amber-200 to-amber-500 bg-clip-text text-transparent px-4"
            >
              Join Our Team
            </h1>
            <p 
              className="careers-hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Shape the future of creative technology with us. We're looking for passionate individuals ready to push boundaries.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
            {jobCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  activeCategory === category.id
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/50"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Jobs Grid - Cards are ALWAYS visible */}
          <div className="jobs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 px-4">
            <AnimatePresence mode="wait">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="job-card bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 cursor-pointer hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 group"
                  onClick={() => setSelectedJob(job)}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className="flex-1 pr-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">
                        {job.title}
                      </h3>
                      {job.subtitle && (
                        <p className="text-xs sm:text-sm text-amber-400">{job.subtitle}</p>
                      )}
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300 flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {job.experience}
                    </span>
                    <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.keySkills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">
                        {skill}
                      </span>
                    ))}
                    {job.keySkills.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">
                        +{job.keySkills.length - 3} more
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 sm:mt-16 md:mt-20 p-6 sm:p-8 md:p-10 rounded-3xl border border-amber-500/20 mx-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
              Don't See Your Role?
            </h2>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              We're always looking for talented individuals. Send us your portfolio and tell us how you can contribute.
            </p>
            <a
              href="mailto:hr.dreamcapture@gmail.com"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 text-sm sm:text-base"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Job Detail Modal - COMPLETELY OUTSIDE ReactLenis */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)'
            }}
          >
            {/* Backdrop - Click to close */}
            <div 
              className="absolute inset-0" 
              onClick={() => setSelectedJob(null)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative border border-amber-500/20 rounded-2xl sm:rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
              style={{
                background: 'radial-gradient(circle, #01092d 10%, #01092d 50%, #01092d 100%)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - Fixed position */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-amber-500/10 hover:bg-amber-500 hover:text-black text-white flex items-center justify-center transition-all z-20 border border-amber-500/30"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Content */}
              <div
                className="overflow-y-auto p-6 sm:p-8 pt-16 sm:pt-20"
                style={{ maxHeight: "85vh", overscrollBehavior: "contain" }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <div className="mb-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 pr-12">
                    {selectedJob.title}
                  </h2>
                  {selectedJob.subtitle && (
                    <p className="text-lg sm:text-xl text-amber-400 mb-4">{selectedJob.subtitle}</p>
                  )}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs sm:text-sm">
                      {selectedJob.experience}
                    </span>
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 text-xs sm:text-sm">
                      {selectedJob.type}
                    </span>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">About the Role</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{selectedJob.description}</p>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                        <span className="text-amber-500 mt-1 flex-shrink-0">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.keySkills.map((skill, idx) => (
                      <span key={idx} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/5 text-gray-300 border border-white/10 text-xs sm:text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

               <a
                  href={`mailto:hr.dreamcapture@gmail.com?subject=${encodeURIComponent(
                    `Job Application – ${selectedJob.title}`
                  )}&body=${encodeURIComponent(
                    "Hi Dream Capture Team,\n\nI would like to apply for this position."
                  )}`}
                  onClick={() => setSelectedJob(null)}
                  className="w-full block text-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 text-sm sm:text-base"
                >
                  Apply for This Position
                </a>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


export default CareersPageContent;