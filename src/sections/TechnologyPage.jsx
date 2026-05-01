import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";
import { FaEnvelope, FaWhatsapp, FaInstagram, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/DC_LOGO.png";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const services = [
  {
    id: "01",
    title: "Web Development",
    subtitle: "Full-stack experiences",
    description:
      "Blazing-fast, scalable web applications built with modern stacks. From complex SaaS platforms to pixel-perfect landing pages — we engineer with purpose.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    accent: "#f59e0b",
  },
  {
    id: "02",
    title: "E-Commerce",
    subtitle: "Stores that convert",
    description:
      "End-to-end commerce solutions with intuitive UX, secure payments, and analytics baked in. Trusted by brands like Jaglate and Arvind Snacks.",
    tags: ["Shopify", "WooCommerce", "Custom Builds", "Payment Gateways"],
    accent: "#38bdf8",
    samples: [
      { label: "Jaglate.com", url: "https://jaglate.com" },
      { label: "arvind-snacks.com", url: "https://arvind-snacks.com" },
    ],
  },
  {
    id: "03",
    title: "Mobile Applications",
    subtitle: "iOS & Android",
    description:
      "Cross-platform apps that feel native. Smooth, performant, and beautifully designed for the devices your customers actually use.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    accent: "#a78bfa",
  },
  {
    id: "04",
    title: "SEO",
    subtitle: "Rank. Be found. Grow.",
    description:
      "Technical audits, on-page optimisation, and content strategy that move you from page 5 to position 1 — and keep you there.",
    tags: ["Technical SEO", "Core Web Vitals", "Schema", "Link Building"],
    accent: "#34d399",
  },
  {
    id: "05",
    title: "Digital Marketing",
    subtitle: "Performance-led growth",
    description:
      "Data-driven campaigns across search, social, and email that turn clicks into customers. ROI-obsessed from day one.",
    tags: ["Google Ads", "Meta Ads", "Email Marketing", "Analytics"],
    accent: "#fb7185",
  },
  {
    id: "06",
    title: "UI/UX Design",
    subtitle: "Interfaces that delight",
    description:
      "Research-backed design that balances aesthetics with usability. We craft experiences that users love and businesses grow with.",
    tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
    accent: "#f472b6",
  },
  {
    id: "07",
    title: "Brand Identity",
    subtitle: "Look the part",
    description:
      "Logo, typography, color system and brand guidelines that make you instantly recognisable and professionally credible.",
    tags: ["Logo Design", "Style Guide", "Visual Identity", "Print & Digital"],
    accent: "#fbbf24",
  },
  {
    id: "08",
    title: "Cloud & Hosting",
    subtitle: "Always online, always fast",
    description:
      "Managed deployments, CI/CD pipelines, CDN setup and 99.9% uptime SLAs so your product never sleeps.",
    tags: ["AWS", "Vercel", "Docker", "CI/CD"],
    accent: "#22d3ee",
  },
];

const stats = [
  { value: "50+", label: "Projects Shipped" },
  { value: "12+", label: "Industries Served" },
  { value: "98%", label: "Client Retention" },
  { value: "4×", label: "Avg. ROI Delivered" },
];

/* ─────────────────────────────────────────
   TYPEWRITER HOOK
───────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 1600) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, charIdx === current.length ? pause : speed);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    }
    if (!deleting && charIdx > current.length) setDeleting(true);
    else if (deleting && charIdx < 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
      setCharIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ─────────────────────────────────────────
   HEADER  — FULLY FIXED & RESPONSIVE
   Key fixes:
   - Logo uses a fixed pixel height that works at every breakpoint
   - Header height is consistent (56px mobile, 64px desktop)
   - No overflow, no layout shift
───────────────────────────────────────── */
function TechHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".tech-header",
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, ease: "power3.out", delay: 0.2, duration: 0.9 }
    );
  }, []);

  const navLinks = [
    { href: "#services", label: "SERVICES" },
    { href: "#work", label: "WORK" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <>
      {/* ── HEADER SHELL ── fixed, explicit heights, no overflow ── */}
      <header
        className="tech-header fixed top-0 left-0 right-0 z-0 transition-all duration-500"
        style={{
          height: "90px",
          background: scrolled ? "rgba(6,11,24,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        {/* Inner wrapper — full height, 3-column layout */}
        <div
          className="h-full w-full flex items-center justify-between"
          style={{ padding: "0 16px" }}
        >
          {/* ── LEFT: LOGO ── */}
          <RouterLink
            to="/"
            className="flex items-center h-full"
            style={{ flexShrink: 0 }}
          >
            {/*
              Logo container: fixed 44px tall on mobile, 48px on sm+
              The image fills the container height while preserving aspect ratio.
              No overflow, no bleeding into header.
            */}
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
              }}
            >
            </div>
          </RouterLink>

          {/* ── CENTER: Desktop Nav ── */}
          <nav
  className="flex items-center gap-4 sm:gap-6"
  style={{
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  }}
>
  {navLinks.map((l) => (
    <a
      key={l.href}
      href={l.href}
      style={{
        fontFamily: "monospace",
        fontSize: "12px", // smaller for mobile
        letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.65)",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#f59e0b")}
      onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.65)")}
    >
      {l.label}
    </a>
  ))}
</nav>

          {/* ── RIGHT: CTA + Hamburger ── */}
          <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
            {/* Desktop CTA */}
            <RouterLink
              to="/"
              className="hidden md:inline-flex items-center"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "6px 14px",
                borderRadius: "2px",
                fontFamily: "monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#f59e0b";
                e.currentTarget.style.color = "#f59e0b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              ← MAIN SITE
            </RouterLink>
          </div>
        </div>
      </header>

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "fixed",
              top: "56px",
              left: 0,
              right: 0,
              zIndex: 40,
              background: "rgba(6,11,24,0.97)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 0",
              gap: "20px",
            }}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
            <RouterLink
              to="/"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: "4px",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "7px 16px",
                borderRadius: "2px",
                fontFamily: "monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
              }}
            >
              ← MAIN SITE
            </RouterLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const typeWords = ["Web Apps", "E-Commerce", "Mobile Apps", "Growth", "Brands"];
  const typed = useTypewriter(typeWords, 75, 1800);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.6 });
    tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" })
      .from(".hero-line1", { opacity: 0, y: 50, duration: 0.9, ease: "power4.out" }, "-=0.3")
      .from(".hero-line2", { opacity: 0, y: 50, duration: 0.9, ease: "power4.out" }, "-=0.5")
      .from(".hero-sub", { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.3");
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6"
      style={{ paddingTop: "100px" }}
    >
      {/* Grid BG */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute top-1/3 left-1/4 w-72 sm:w-[450px] h-72 sm:h-[450px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)", filter: "blur(70px)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-[380px] h-56 sm:h-[380px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)", filter: "blur(70px)" }} />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center w-full max-w-5xl mx-auto">
        <div className="hero-eyebrow inline-flex items-center gap-3 mb-6 sm:mb-8">
          <span className="h-px w-6 sm:w-10 bg-amber-400/60" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-amber-400/80 uppercase">
            Dream Capture — Technology Division
          </span>
          <span className="h-px w-6 sm:w-10 bg-amber-400/60" />
        </div>

        <div className="overflow-hidden mb-1 sm:mb-2">
          <h1 className="hero-line1 font-black text-white leading-none"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 7vw, 6.5rem)" }}>
            We Build Digital
          </h1>
        </div>

        <div className="overflow-hidden mb-6 sm:mb-8">
          <h1 className="hero-line2 font-black leading-none"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 7vw, 6.5rem)" }}>
            <span style={{ WebkitTextStroke: "1px #f59e0b", color: "transparent" }}>
              {typed}
              <span className="inline-block w-[3px] h-[0.85em] bg-amber-400 ml-1 align-middle animate-pulse" />
            </span>
          </h1>
        </div>

        <p className="hero-sub max-w-lg mx-auto text-white/50 leading-relaxed mb-8 sm:mb-12 font-light px-2"
          style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)" }}>
          Websites, apps, SEO & growth marketing — engineered for scale, designed to convert.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href="#services"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-bold text-xs sm:text-sm tracking-widest font-mono rounded-sm transition-all duration-300 hover:scale-105 text-center"
            style={{ background: "#f59e0b", color: "#060b18" }}>
            EXPLORE SERVICES
          </a>
          <a href="#contact"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-bold text-xs sm:text-sm tracking-widest font-mono border border-white/20 text-white/70 rounded-sm hover:border-amber-400 hover:text-amber-400 transition-all duration-300 text-center">
            GET A QUOTE
          </a>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
    <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   STATS BAR
───────────────────────────────────────── */
function StatsBar() {
  return (
    <section className="border-y border-white/5 py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((s, i) => (
          <motion.div key={i} className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
            <span className="font-black text-amber-400"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              {s.value}
            </span>
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white/40 mt-1 uppercase">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="relative group border rounded-sm p-5 sm:p-7 overflow-hidden cursor-default transition-all duration-500 h-full"
      style={{
        background: hovered ? `linear-gradient(135deg, ${service.accent}08, transparent)` : "rgba(255,255,255,0.01)",
        borderColor: hovered ? `${service.accent}40` : "rgba(255,255,255,0.05)",
      }}
    >
      <span className="absolute top-4 right-5 font-black text-5xl select-none transition-all duration-500"
        style={{ fontFamily: "'Syne', sans-serif", color: hovered ? `${service.accent}20` : "rgba(255,255,255,0.03)" }}>
        {service.id}
      </span>
      <div className="h-0.5 mb-4 sm:mb-5 transition-all duration-500"
        style={{ background: service.accent, width: hovered ? "3rem" : "2rem" }} />
      <h3 className="font-black text-xl sm:text-2xl mb-1 transition-colors duration-300"
        style={{ fontFamily: "'Syne', sans-serif", color: hovered ? service.accent : "white" }}>
        {service.title}
      </h3>
      <p className="font-mono text-[10px] tracking-widest text-white/30 mb-3 uppercase">{service.subtitle}</p>
      <p className="text-white/50 leading-relaxed text-xs sm:text-sm mb-4">{service.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {service.tags.map((tag, i) => (
          <span key={i} className="font-mono text-[9px] sm:text-[10px] tracking-widest px-2 py-1 rounded-sm border transition-colors duration-300"
            style={{
              borderColor: hovered ? `${service.accent}40` : "rgba(255,255,255,0.08)",
              color: hovered ? service.accent : "rgba(255,255,255,0.35)",
            }}>
            {tag}
          </span>
        ))}
      </div>
      {service.samples && (
        <div className="flex flex-wrap gap-3 mt-2">
          {service.samples.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs underline underline-offset-4 transition-colors duration-300"
              style={{ color: service.accent, opacity: 0.8 }}>
              {s.label} ↗
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SERVICES SECTION
───────────────────────────────────────── */
function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div className="mb-10 sm:mb-16" initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-10 bg-amber-400/60" />
            <span className="font-mono text-xs tracking-[0.3em] text-amber-400/80 uppercase">What We Do</span>
          </div>
          <h2 className="font-black text-white leading-none"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Our Services
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={service.id} className={service.id === "01" ? "sm:col-span-2 lg:col-span-3" : ""}>
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   WORK STRIP
───────────────────────────────────────── */
function WorkStrip() {
  const works = [
    { title: "Jaglate.com", category: "E-Commerce · Chocolates", url: "https://jaglate.com" },
    { title: "Arvind Snacks", category: "E-Commerce · Snacks", url: "https://arvind-snacks.com" },
    { title: "Rani Paints", category: "E-Commerce · Paints Reselling", url: "https://ranipaints.in" },
  ];
  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div className="mb-10 sm:mb-16" initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-10 bg-amber-400/60" />
            <span className="font-mono text-xs tracking-[0.3em] text-amber-400/80 uppercase">Selected Work</span>
          </div>
          <h2 className="font-black text-white leading-none"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Live Projects
          </h2>
        </motion.div>
        <div className="space-y-0">
          {works.map((work, i) => (
            <motion.a key={i} href={work.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-between py-5 sm:py-6 border-b border-white/5 hover:border-amber-400/30 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <span className="font-mono text-xs text-white/20 w-6 sm:w-8 shrink-0">0{i + 1}</span>
                <h3 className="font-black text-white group-hover:text-amber-400 transition-colors duration-300 truncate"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.25rem, 3.5vw, 3rem)" }}>
                  {work.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 sm:gap-6 shrink-0 ml-3">
                <span className="hidden sm:block font-mono text-[10px] sm:text-xs tracking-widest text-white/30 uppercase">
                  {work.category}
                </span>
                <span className="text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300 text-lg sm:text-xl">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT SECTION  — completely redesigned
   Clean dark card layout, no white form box
───────────────────────────────────────── */
function TechContact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const formRef = useRef(null);
  const [isValid, setIsValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const capitalize = (str) => str && str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const { name, phone, email, message } = formData;
    const ok =
      /^[A-Za-z\s]+$/.test(name) &&
      /^\d{10}$/.test(phone) &&
      email.endsWith("@gmail.com") &&
      message.trim().length > 0;
    setIsValid(ok);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      await emailjs.send(
        "service_2wak5wn",
        "template_14uhi2g",
        {
          to_name: "Dream Capture Technology",
          from_name: capitalize(formData.name),
          message: capitalize(formData.message),
          phone: formData.phone,
          email: formData.email,
        },
        "UO1ngjp5VtEJKIFsV"
      );
      setShowSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      formRef.current?.reset();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending the message.");
    } finally {
      setLoading(false);
    }
  };

  /* Shared input style */
  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    padding: "12px 14px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "monospace",
    fontSize: "10px",
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "6px",
    textTransform: "uppercase",
  };

  const contactInfo = [
    {
      icon: <FaEnvelope style={{ color: "#f59e0b" }} />,
      label: "Email",
      value: "contactus.dreamcapture@gmail.com",
      href: "mailto:contactus.dreamcapture@gmail.com",
    },
    {
      icon: <FaWhatsapp style={{ color: "#34d399" }} />,
      label: "WhatsApp",
      value: "+91 96770 94546",
      href: "https://wa.me/+919677094546",
    },
    {
      icon: <FaMapMarkerAlt style={{ color: "#fb7185" }} />,
      label: "Location",
      value: "Madurai, India",
      href: null,
    },
  ];

  return (
    <section id="contact" className="relative w-full border-t border-white/5">
      {/* Section header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 pt-16 sm:pt-24 pb-12 sm:pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-10 bg-amber-400/60" />
            <span className="font-mono text-xs tracking-[0.3em] text-amber-400/80 uppercase">Let's Talk</span>
          </div>
          <h2 className="font-black text-white leading-none mb-4"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Get in Touch
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-md">
            Ready to build something remarkable? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Two-column layout: contact info + form */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* LEFT: Contact info */}
          <motion.div className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>

            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div style={{
                  width: "40px", height: "40px", borderRadius: "8px", flexShrink: 0,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "3px" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", textDecoration: "none", wordBreak: "break-all" }}
                      onMouseEnter={(e) => e.target.style.color = "#f59e0b"}
                      onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.75)"}>
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="mt-2">
              <p style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "12px" }}>
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <FaWhatsapp />, href: "https://wa.me/+919677094546", color: "#34d399" },
                  { icon: <FaInstagram />, href: "https://www.instagram.com/_dreamcapture_entertainment?igsh=MWJkZnF1dHM3YTI2MA==", color: "#f472b6" },
                  { icon: <FaYoutube />, href: "https://youtube.com/@dreamcapture_entertainment?si=03gyNiyv2NFEdFgA", color: "#fb7185" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      width: "38px", height: "38px", borderRadius: "8px", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: "16px",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color + "50"; e.currentTarget.style.background = s.color + "10"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div className="lg:col-span-3"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
              padding: "28px 24px",
            }}>
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Row 1: Name + Phone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}
                  className="grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <input type="text" id="name" name="name" value={formData.name}
                      onChange={handleChange} placeholder="Your name"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "#f59e0b"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                  <div>
                    <label htmlFor="phone" style={labelStyle}>Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone}
                      onChange={handleChange} placeholder="10-digit number"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "#f59e0b"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input type="email" id="email" name="email" value={formData.email}
                    onChange={handleChange} placeholder="you@gmail.com"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = "#f59e0b"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>

                {/* Row 3: Message */}
                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea id="message" name="message" value={formData.message}
                    onChange={handleChange} placeholder="Tell us about your project…"
                    rows={5} style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => e.target.style.borderColor = "#f59e0b"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>

                {/* Submit */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {isValid ? (
                    <motion.button type="submit" disabled={loading}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                      style={{
                        background: "#f59e0b", color: "#060b18",
                        padding: "12px 28px", borderRadius: "4px",
                        fontFamily: "monospace", fontWeight: "700", fontSize: "11px",
                        letterSpacing: "0.2em", border: "none", cursor: loading ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", gap: "8px", opacity: loading ? 0.8 : 1,
                      }}>
                      {loading && (
                        <svg className="animate-spin" style={{ width: "14px", height: "14px" }} viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      )}
                      {loading ? "SENDING…" : "SEND MESSAGE"}
                    </motion.button>
                  ) : (
                    <span style={{
                      padding: "12px 28px", borderRadius: "4px", background: "rgba(255,255,255,0.06)",
                      fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.25)", cursor: "not-allowed",
                    }}>
                      FILL ALL FIELDS
                    </span>
                  )}
                </div>
              </form>
            </div>

            <AnimatePresence>
              {showSuccess && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    marginTop: "12px", padding: "14px 18px", borderRadius: "8px",
                    background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)",
                    color: "#34d399", fontFamily: "monospace", fontSize: "12px", letterSpacing: "0.1em",
                  }}>
                  ✓ MESSAGE SENT SUCCESSFULLY — WE'LL BE IN TOUCH SOON.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── FOOTER ── completely redesigned ── */}
      <footer style={{
        background: "linear-gradient(180deg, rgba(6,11,24,0) 0%, rgba(6,11,24,1) 8%, #060b18 100%)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        marginTop: "16px",
      }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">

            {/* Col 1: Brand */}
            <div>
              <p style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "18px",
                color: "white", marginBottom: "8px", letterSpacing: "0.02em",
              }}>
                Dream Capture
                <span style={{ color: "#f59e0b" }}> Technology</span>
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: "1.6", maxWidth: "220px" }}>
                We help brands reach their goals through creative digital solutions.
              </p>
            </div>

            {/* Col 2: Links */}
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "14px" }}>
                Quick Links
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["#services", "#work", "#contact"].map((href, i) => (
                  <a key={i} href={href}
                    style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.target.style.color = "#f59e0b"}
                    onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.45)"}>
                    {href.replace("#", "").charAt(0).toUpperCase() + href.slice(2)}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 3: Contact */}
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "14px" }}>
                Contact
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a href="mailto:contactus.dreamcapture@gmail.com"
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", textDecoration: "none", wordBreak: "break-word", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.target.style.color = "#f59e0b"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.45)"}>
                  contactus.dreamcapture@gmail.com
                </a>
                <a href="https://wa.me/+919677094546"
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.target.style.color = "#34d399"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.45)"}>
                  +91 96770 94546
                </a>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>Madurai, India</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            marginTop: "40px", paddingTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex", flexWrap: "wrap", alignItems: "center",
            justifyContent: "space-between", gap: "12px",
          }}>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
              © {new Date().getFullYear()} Dream Capture Technology. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "14px" }}>
              {[
                { icon: <FaWhatsapp />, href: "https://wa.me/+919677094546", color: "#34d399" },
                { icon: <FaInstagram />, href: "https://www.instagram.com/_dreamcapture_entertainment?igsh=MWJkZnF1dHM3YTI2MA==", color: "#f472b6" },
                { icon: <FaYoutube />, href: "https://youtube.com/@dreamcapture_entertainment?si=03gyNiyv2NFEdFgA", color: "#fb7185" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.3)", fontSize: "16px", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = s.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

/* ─────────────────────────────────────────
   PAGE WRAPPER
───────────────────────────────────────── */
export default function TechnologyPage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen text-white"
      style={{ background: "linear-gradient(160deg, #060b18 0%, #0a1025 50%, #060b18 100%)" }}>
      <TechHeader />
      <Hero />
      <StatsBar />
      <ServicesSection />
      <WorkStrip />
      <TechContact />
    </div>
  );
}