import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════
   TYPEWRITER HOOK
══════════════════════════════════════════════ */
function useTypewriter(words = [], speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplay(current.slice(0, charIdx + (deleting ? -1 : 1)));
      setCharIdx((c) => c + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ══════════════════════════════════════════════
   SCROLL-TRIGGERED FADE IN
══════════════════════════════════════════════ */
function FadeIn({ children, delay = 0, y = 40, x = 0, scale = 1, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x, scale }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   STAGGER CHILDREN
══════════════════════════════════════════════ */
function StaggerParent({ children, className = "", stagger = 0.1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
function StaggerChild({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════ */
function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    const duration = 1800;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.round((num * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══════════════════════════════════════════════
   MAGNETIC BUTTON
══════════════════════════════════════════════ */
function MagneticBtn({ children, className = "", style = {}, href }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const springX = useSpring(pos.x, { stiffness: 200, damping: 20 });
  const springY = useSpring(pos.y, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
    });
  };
  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div style={{ x: springX, y: springY }} ref={ref}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <a href={href} className={className} style={style}>{children}</a>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   FLOATING ORBS BACKGROUND
══════════════════════════════════════════════ */
function FloatingOrbs() {
  const orbs = [
    { w: 500, h: 500, top: "5%",  left: "60%", color: "rgba(245,158,11,0.06)", blur: 80, dur: 8  },
    { w: 350, h: 350, top: "40%", left: "5%",  color: "rgba(99,102,241,0.05)", blur: 60, dur: 11 },
    { w: 280, h: 280, top: "70%", left: "75%", color: "rgba(245,158,11,0.04)", blur: 50, dur: 14 },
    { w: 200, h: 200, top: "20%", left: "35%", color: "rgba(255,255,255,0.02)",blur: 40, dur: 9  },
  ];
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: o.w, height: o.h, top: o.top, left: o.left, background: o.color, filter: `blur(${o.blur}px)` }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   GRID LINES
══════════════════════════════════════════════ */
function GridLines() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(245,158,11,0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,158,11,0.8) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

/* ══════════════════════════════════════════════
   SECTION LABEL
══════════════════════════════════════════════ */
function SectionLabel({ text }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-4"
      style={{ border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.06)", color: "#f59e0b" }}
    >
      <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
      {text}
    </span>
  );
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const STATS = [
  { value: "50", suffix: "+", label: "Projects Delivered" },
  { value: "12", suffix: "+", label: "Industries Served"  },
  { value: "98", suffix: "%", label: "Client Retention"   },
  { value: "4",  suffix: "×", label: "Average ROI"        },
];

const SERVICES = [
  {
    icon: "🌐", title: "Web Development", subtitle: "Fast · Scalable · Modern",
    description: "Full-stack web applications built for performance and growth. From landing pages to complex SaaS platforms.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    project: { label: "ZuessSkills ↗", href: "https://www.zuesskills.com/" },
    accent: "#f59e0b",
  },
  {
    icon: "🛒", title: "E-Commerce", subtitle: "Sell More · Convert Better",
    description: "End-to-end storefronts with seamless checkout, inventory, and analytics built-in.",
    tags: ["Shopify", "WooCommerce", "Stripe", "SEO"],
    projects: [
      { label: "Jaglate Chocolates ↗", href: "https://jaglate.com" },
      { label: "Arvind Snacks ↗",      href: "https://arvind-snacks.com" },
      { label: "Rani Paints ↗",        href: "https://ranipaints.in/" },
    ],
    accent: "#f97316",
  },
  {
    icon: "📱", title: "Mobile Apps", subtitle: "iOS & Android · Cross-platform",
    description: "Native-feel apps using React Native and Flutter — shipped fast and optimized for retention.",
    tags: ["React Native", "Flutter", "Firebase", "Push Notifications"],
    accent: "#a78bfa",
  },
  {
    icon: "🔍", title: "SEO", subtitle: "Rank Higher · Get Found",
    description: "Technical SEO audits, on-page optimization, and content strategies that compound over time.",
    tags: ["Technical SEO", "Core Web Vitals", "Schema", "Analytics"],
    accent: "#34d399",
  },
  {
    icon: "📣", title: "Digital Marketing", subtitle: "Reach · Engage · Convert",
    description: "Data-driven paid and organic campaigns across Google, Meta, and LinkedIn to grow your pipeline.",
    tags: ["Google Ads", "Meta Ads", "Email", "Funnels"],
    accent: "#f59e0b",
  },
  {
    icon: "🎨", title: "UI / UX Design", subtitle: "Intuitive · Beautiful · Tested",
    description: "User research, wireframes, and high-fidelity designs in Figma that delight users and reduce churn.",
    tags: ["Figma", "Prototyping", "User Testing", "Design Systems"],
    accent: "#ec4899",
  },
  {
    icon: "✦",  title: "Branding", subtitle: "Identity · Voice · Presence",
    description: "Logo design, brand guidelines, and visual identity systems that make your brand unforgettable.",
    tags: ["Logo", "Brand Guidelines", "Typography", "Packaging"],
    accent: "#fbbf24",
  },
  {
    icon: "☁️", title: "Cloud & Hosting", subtitle: "Reliable · Scalable · Secure",
    description: "Managed cloud infra on AWS, GCP, and Vercel with CI/CD pipelines and 99.9% uptime SLAs.",
    tags: ["AWS", "GCP", "Vercel", "Docker", "CI/CD"],
    accent: "#38bdf8",
  },
  {
    icon: "🥽", title: "AR / VR", subtitle: "Immersive · Interactive · Ahead",
    description: "Augmented and virtual reality experiences for retail, real estate, training, and brand activations.",
    tags: ["WebXR", "Three.js", "Unity", "ARKit", "ARCore"],
    accent: "#818cf8",
  },
];

const PROJECTS = [
  { name: "ZuessSkills",   category: "Ed-Tech Platform",      desc: "Full-stack learning platform with course management, live cohorts & payments.", href: "https://www.zuesskills.com/", tag: "Web App",       year: "2024" },
  { name: "Jaglate",       category: "Chocolate E-Commerce",  desc: "Premium chocolate brand storefront with custom product configurator & gifting flow.", href: "https://jaglate.com",        tag: "E-Commerce",    year: "2024" },
  { name: "Arvind Snacks", category: "FMCG Store",            desc: "Snacks brand digital storefront with regional delivery and WhatsApp checkout.",      href: "https://arvind-snacks.com",  tag: "E-Commerce",    year: "2024" },
  { name: "Rani Paints",   category: "Paint Company",         desc: "Corporate website + product catalogue with color visualizer for interior design.",   href: "https://ranipaints.in/",     tag: "Web + Branding",year: "2024" },
];

/* ══════════════════════════════════════════════
   SERVICE CARD
══════════════════════════════════════════════ */
function ServiceCard({ s, i }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 * (i % 3) }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, scale: 1.02 }}
      style={{ perspective: 800 }}
      className="relative h-full"
    >
      <div
        className="relative h-full rounded-2xl p-6 flex flex-col gap-4 overflow-hidden cursor-default"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${hovered ? s.accent + "50" : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px ${s.accent}15`
            : "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
          transition: "border 0.3s, box-shadow 0.3s",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${s.accent}60, transparent)`, opacity: hovered ? 1 : 0.3, transition: "opacity 0.3s" }} />

        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ background: `radial-gradient(circle at 50% 0%, ${s.accent}12 0%, transparent 65%)` }} />
          )}
        </AnimatePresence>

        <motion.div
          animate={hovered ? { scale: 1.15, rotate: [0, -5, 5, 0] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-3xl w-13 h-13 rounded-xl flex items-center justify-center"
          style={{ background: `${s.accent}12`, border: `1px solid ${s.accent}25`, width: 52, height: 52 }}
        >
          {s.icon}
        </motion.div>

        <div>
          <h3 className="text-white font-bold text-base leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>{s.title}</h3>
          <p className="text-[10px] font-semibold mt-1 uppercase tracking-widest" style={{ color: s.accent + "aa" }}>{s.subtitle}</p>
        </div>

        <p className="text-white/45 text-sm leading-relaxed flex-1">{s.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {s.tags.map((t) => (
            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-medium"
              style={{ background: `${s.accent}0f`, border: `1px solid ${s.accent}28`, color: s.accent + "cc" }}>
              {t}
            </span>
          ))}
        </div>

        {(s.project || s.projects) && (
          <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
            {s.project && (
              <a href={s.project.href} target="_blank" rel="noopener noreferrer"
                className="text-xs font-semibold transition-colors" style={{ color: s.accent }}>
                {s.project.label}
              </a>
            )}
            {s.projects?.map((p) => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer"
                className="text-xs font-medium transition-colors" style={{ color: s.accent + "bb" }}>
                {p.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════ */
function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const valid =
    /^[A-Za-z\s]{2,}$/.test(form.name) &&
    /^\d{10}$/.test(form.phone) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.message.trim().length > 5;

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setSent(true);
    setForm({ name: "", phone: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const fieldStyle = (name) => ({
    background: focused === name ? "rgba(245,158,11,0.06)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === name ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.08)"}`,
    backdropFilter: "blur(10px)",
    transition: "all 0.3s",
  });

  const inputCls = "w-full px-4 py-3 text-sm text-white placeholder-white/20 rounded-xl outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.2em] mb-2"
            style={{ color: focused === "name" ? "#f59e0b" : "rgba(255,255,255,0.35)" }}>Name</label>
          <input name="name" value={form.name} onChange={handleChange}
            onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
            placeholder="Full name" className={inputCls} style={fieldStyle("name")} />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.2em] mb-2"
            style={{ color: focused === "phone" ? "#f59e0b" : "rgba(255,255,255,0.35)" }}>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange}
            onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
            placeholder="10-digit number" className={inputCls} style={fieldStyle("phone")} />
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.2em] mb-2"
          style={{ color: focused === "email" ? "#f59e0b" : "rgba(255,255,255,0.35)" }}>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange}
          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
          placeholder="you@example.com" className={inputCls} style={fieldStyle("email")} />
      </div>
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.2em] mb-2"
          style={{ color: focused === "message" ? "#f59e0b" : "rgba(255,255,255,0.35)" }}>Message</label>
        <textarea name="message" value={form.message} onChange={handleChange}
          onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
          rows={4} placeholder="Tell us about your project…"
          className={`${inputCls} resize-none`} style={fieldStyle("message")} />
      </div>

      <div className="flex items-center gap-5 pt-2">
        <motion.button type="submit" disabled={!valid}
          whileHover={valid ? { scale: 1.04 } : {}}
          whileTap={valid ? { scale: 0.96 } : {}}
          className="relative overflow-hidden px-10 py-3.5 rounded-xl font-bold text-sm"
          style={{
            background: valid ? "linear-gradient(135deg,#f59e0b,#d97706)" : "rgba(255,255,255,0.05)",
            color: valid ? "#01092d" : "rgba(255,255,255,0.2)",
            cursor: valid ? "pointer" : "not-allowed",
            border: `1px solid ${valid ? "transparent" : "rgba(255,255,255,0.06)"}`,
          }}
        >
          {valid && (
            <motion.div className="absolute inset-0"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
            />
          )}
          <span className="relative z-10">{valid ? "Send Message →" : "Fill all fields"}</span>
        </motion.button>

        <AnimatePresence>
          {sent && (
            <motion.div initial={{ opacity: 0, x: -20, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 0.5 }}>✓</motion.span>
              Sent!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function TechnologyPage() {
  const typed = useTypewriter(["Web Apps", "E-Commerce", "Mobile Apps", "Growth", "Brands"], 75, 2000);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.65], [1, 0]);

  const marqueeItems = ["Web Development", "E-Commerce", "Mobile Apps", "SEO", "Branding", "Cloud", "AR / VR", "UI/UX", "Digital Marketing"];

  return (
    <div className="min-h-screen w-full overflow-x-hidden text-white" style={{ background: "#01092d" }}>

      <FloatingOrbs />
      <GridLines />

      {/* Noise overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px",
        }}
      />

      <div className="relative z-10">

        {/* ═══════════════ HERO ═══════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-24 pb-20 overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />

          <motion.div className="absolute rounded-full border border-amber-400/10 pointer-events-none"
            style={{ width: 600, height: 600, top: "50%", left: "50%", x: "-50%", y: "-50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute rounded-full border border-amber-400/05 pointer-events-none"
            style={{ width: 900, height: 900, top: "50%", left: "50%", x: "-50%", y: "-50%" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }} />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-4xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }} className="flex justify-center mb-5">
              <SectionLabel text="Technology & Services" />
            </motion.div>

            {/* LINE 1: "We Build" */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}>
              <h1 className="font-extrabold leading-none text-white block"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: "-0.02em"
                }}>
                We Build
              </h1>
            </motion.div>

            {/* LINE 2: typewriter — monospace/terminal font for distinction */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{ display: "block", minHeight: "1.2em" }}>
              <h1 className="font-bold leading-none block"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                  fontFamily: "'Courier New', 'Lucida Console', monospace",
                  letterSpacing: "0.02em",
                  background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f97316 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                {typed}
                <span style={{ WebkitTextFillColor: "#f59e0b", color: "#f59e0b" }} className="animate-blink">_</span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-white/45 text-sm sm:text-base max-w-md mx-auto leading-relaxed mt-6 mb-10"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              End-to-end digital solutions — from idea to launch.
              We design, build, and scale products that drive real outcomes.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticBtn href="#contact-tech"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-[#01092d]"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", boxShadow: "0 0 30px rgba(245,158,11,0.3)" }}>
                Start a Project →
              </MagneticBtn>
              <MagneticBtn href="#services-tech"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white"
                style={{ border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.05)", backdropFilter: "blur(10px)" }}>
                Explore Services
              </MagneticBtn>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 rounded-full"
              style={{ background: "linear-gradient(to bottom, rgba(245,158,11,0.6), transparent)" }} />
          </motion.div>
        </section>

        {/* ═══════════════ MARQUEE ═══════════════ */}
        <div className="py-4 overflow-hidden border-y border-white/05"
          style={{ background: "rgba(245,158,11,0.025)" }}>
          <motion.div className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-xs font-bold uppercase tracking-widest flex items-center gap-4"
                style={{ color: "rgba(245,158,11,0.5)", fontFamily: "'Syne',sans-serif" }}>
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/30 shrink-0" />
              </span>
            ))}
          </motion.div>
        </div>

        {/* ═══════════════ STATS ═══════════════ */}
        <section className="py-20 px-5">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-12">
              <SectionLabel text="By the Numbers" />
              <h2 className="font-extrabold text-white"
                style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", fontFamily: "'Syne',sans-serif" }}>
                Results That Speak
              </h2>
            </FadeIn>
            <StaggerParent className="grid grid-cols-2 sm:grid-cols-4 gap-5" stagger={0.12}>
              {STATS.map((s) => (
                <StaggerChild key={s.label}>
                  <div className="relative rounded-2xl p-6 text-center overflow-hidden group"
                    style={{
                      background: "rgba(255,255,255,0.035)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.1) 0%, transparent 70%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-px opacity-30"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.8), transparent)" }} />
                    <p className="font-black text-amber-400 mb-1"
                      style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontFamily: "'Syne',sans-serif" }}>
                      <Counter target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-white/40 text-xs uppercase tracking-widest">{s.label}</p>
                  </div>
                </StaggerChild>
              ))}
            </StaggerParent>
          </div>
        </section>

        {/* ═══════════════ SERVICES ═══════════════ */}
        <section id="services-tech" className="py-20 px-5 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="max-w-6xl mx-auto relative">
            <FadeIn className="text-center mb-12">
              <SectionLabel text="What We Do" />
              <h2 className="font-extrabold text-white"
                style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", fontFamily: "'Syne',sans-serif" }}>
                Our Services
              </h2>
              <p className="text-white/35 mt-2 max-w-lg mx-auto text-sm">
                Everything you need to launch, grow, and scale — under one roof.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
            </div>
          </div>
        </section>

        {/* ═══════════════ PROJECTS ═══════════════ */}
        <section className="py-20 px-5">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-12">
              <SectionLabel text="Our Work" />
              <h2 className="font-extrabold text-white"
                style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", fontFamily: "'Syne',sans-serif" }}>
                Projects We're Proud Of
              </h2>
            </FadeIn>
            <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 gap-5" stagger={0.1}>
              {PROJECTS.map((p) => (
                <StaggerChild key={p.name}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer"
                    className="group block rounded-2xl p-6 relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)" }} />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors"
                            style={{ fontFamily: "'Syne',sans-serif" }}>{p.name}</h3>
                          <p className="text-white/30 text-xs mt-0.5">{p.category} · {p.year}</p>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold px-3 py-1 rounded-full text-amber-400"
                          style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                          {p.tag}
                        </span>
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed mb-4">{p.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold group-hover:gap-3 transition-all">
                        Visit project <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </span>
                    </div>
                  </a>
                </StaggerChild>
              ))}
            </StaggerParent>
          </div>
        </section>

        {/* ═══════════════ CONTACT ═══════════════ */}
        <section id="contact-tech" className="py-20 px-5 relative">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,158,11,0.05) 0%, transparent 70%)" }} />
          <div className="max-w-3xl mx-auto relative">
            <FadeIn className="text-center mb-10">
              <SectionLabel text="Get in Touch" />
              <h2 className="font-extrabold text-white"
                style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", fontFamily: "'Syne',sans-serif" }}>
                Start Your Project
              </h2>
              <p className="text-white/35 mt-2 text-sm max-w-sm mx-auto">
                Tell us what you're building. We'll get back within 24 hours.
              </p>
            </FadeIn>
            <FadeIn>
              <div className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)" }} />
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)", filter: "blur(30px)" }} />
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════ FOOTER — compact single row ═══════════════ */}
        <footer className="px-5 py-5 relative"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(1,9,45,0.9)", backdropFilter: "blur(20px)" }}>
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-white/30">
            <p>© {new Date().getFullYear()} Dream Capture Entertainment · Madurai, India</p>
            <div className="flex items-center gap-5">
              <a href="mailto:contactus.dreamcapture@gmail.com" className="hover:text-amber-400 transition-colors">
                contactus.dreamcapture@gmail.com
              </a>
              {[
                { l: "WP",  h: "https://wa.me/+919677094546" },
                { l: "IG", h: "https://www.instagram.com/_dreamcapture_entertainment?igsh=MWJkZnF1dHM3YTI2MA==" },
                { l: "YT",   h: "https://youtube.com/@dreamcapture_entertainment?si=03gyNiyv2NFEdFgA" },
              ].map((s) => (
                <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors">{s.l}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Poppins:wght@400;500;600&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .animate-blink { animation: blink 0.85s step-end infinite; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #01092d; }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.4); border-radius: 99px; }
      `}</style>
    </div>
  );
}